-- Game On Database Schema
-- PostgreSQL with PostGIS extension

-- Enable PostGIS extension for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE position_preference AS ENUM ('goalkeeper', 'defender', 'midfielder', 'forward', 'any');
CREATE TYPE match_status AS ENUM ('open', 'full', 'cancelled', 'completed');
CREATE TYPE participation_status AS ENUM ('joined', 'left', 'removed');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved');
CREATE TYPE notification_type AS ENUM ('match_reminder', 'match_joined', 'match_cancelled', 'match_full', 'message', 'rating_received');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    preferred_position position_preference DEFAULT 'any',
    skill_level skill_level DEFAULT 'intermediate',
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues table
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    google_places_id TEXT UNIQUE,
    location GEOGRAPHY(POINT, 4326) NOT NULL, -- PostGIS geography type
    city TEXT,
    country TEXT DEFAULT 'Greece',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_venues_location ON venues USING GIST(location);

-- Matches table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE RESTRICT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 90,
    max_players INTEGER DEFAULT 10, -- 5v5
    skill_level_preference skill_level,
    status match_status DEFAULT 'open',
    description TEXT,
    location GEOGRAPHY(POINT, 4326) NOT NULL, -- Denormalized from venue for faster queries
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_matches_location ON matches USING GIST(location);
CREATE INDEX idx_matches_scheduled_at ON matches(scheduled_at);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_created_by ON matches(created_by);

-- Match Participation table
CREATE TABLE match_participations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status participation_status DEFAULT 'joined',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE,
    show_up_count INTEGER DEFAULT 0,
    no_show_count INTEGER DEFAULT 0,
    UNIQUE(match_id, profile_id)
);

CREATE INDEX idx_match_participations_match_id ON match_participations(match_id);
CREATE INDEX idx_match_participations_profile_id ON match_participations(profile_id);

-- Chat Threads table
CREATE TABLE chat_threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(match_id)
);

CREATE INDEX idx_chat_threads_match_id ON chat_threads(match_id);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Ratings table
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rater_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rated_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(rater_id, rated_id, match_id)
);

CREATE INDEX idx_ratings_rated_id ON ratings(rated_id);
CREATE INDEX idx_ratings_match_id ON ratings(match_id);

-- Reports table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reported_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    status report_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES profiles(id)
);

CREATE INDEX idx_reports_reported_id ON reports(reported_id);
CREATE INDEX idx_reports_status ON reports(status);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    data JSONB,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read_at ON notifications(read_at);

-- Device tokens for push notifications
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    expo_push_token TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, expo_push_token)
);

CREATE INDEX idx_devices_user_id ON devices(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Player'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to automatically create chat thread when match is created
CREATE OR REPLACE FUNCTION public.create_match_chat_thread()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.chat_threads (match_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create chat thread on match creation
CREATE TRIGGER on_match_created
    AFTER INSERT ON matches
    FOR EACH ROW EXECUTE FUNCTION public.create_match_chat_thread();

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Venues policies (public read, admin write in future)
CREATE POLICY "Anyone can view venues" ON venues
    FOR SELECT USING (true);

-- Matches policies
CREATE POLICY "Anyone can view matches" ON matches
    FOR SELECT USING (true);

CREATE POLICY "Users can create matches" ON matches
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Match creators can update their matches" ON matches
    FOR UPDATE USING (auth.uid() = created_by);

-- Match Participations policies
CREATE POLICY "Anyone can view participations" ON match_participations
    FOR SELECT USING (true);

CREATE POLICY "Users can join matches" ON match_participations
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can leave matches" ON match_participations
    FOR UPDATE USING (auth.uid() = profile_id);

-- Chat Threads policies
CREATE POLICY "Match participants can view chat threads" ON chat_threads
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM match_participations
            WHERE match_id = chat_threads.match_id
            AND profile_id = auth.uid()
            AND status = 'joined'
        )
    );

-- Messages policies
CREATE POLICY "Match participants can view messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM match_participations mp
            JOIN chat_threads ct ON ct.match_id = mp.match_id
            WHERE ct.id = messages.thread_id
            AND mp.profile_id = auth.uid()
            AND mp.status = 'joined'
        )
    );

CREATE POLICY "Match participants can send messages" ON messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id
        AND EXISTS (
            SELECT 1 FROM match_participations mp
            JOIN chat_threads ct ON ct.match_id = mp.match_id
            WHERE ct.id = messages.thread_id
            AND mp.profile_id = auth.uid()
            AND mp.status = 'joined'
        )
    );

-- Ratings policies
CREATE POLICY "Anyone can view ratings" ON ratings
    FOR SELECT USING (true);

CREATE POLICY "Users can create ratings" ON ratings
    FOR INSERT WITH CHECK (auth.uid() = rater_id);

-- Reports policies
CREATE POLICY "Users can create reports" ON reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON reports
    FOR SELECT USING (auth.uid() = reporter_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Devices policies
CREATE POLICY "Users can manage own devices" ON devices
    FOR ALL USING (auth.uid() = user_id);


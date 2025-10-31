-- PostGIS Functions for Game On
-- These functions enable efficient geospatial queries

-- Function to get matches within a radius (in kilometers)
CREATE OR REPLACE FUNCTION get_matches_nearby(
    user_lat DOUBLE PRECISION,
    user_lng DOUBLE PRECISION,
    radius_km DOUBLE PRECISION DEFAULT 10,
    match_status TEXT[] DEFAULT ARRAY['open', 'full'],
    skill_preference TEXT DEFAULT NULL,
    scheduled_after TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS TABLE (
    match_id UUID,
    distance_km DOUBLE PRECISION,
    match_data JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.id AS match_id,
        ST_Distance(
            ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
            m.location::geography
        ) / 1000.0 AS distance_km,
        row_to_json(m)::jsonb AS match_data
    FROM matches m
    WHERE 
        m.status = ANY(match_status)
        AND (skill_preference IS NULL OR m.skill_level_preference::TEXT = skill_preference)
        AND (scheduled_after IS NULL OR m.scheduled_at >= scheduled_after)
        AND ST_DWithin(
            ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
            m.location::geography,
            radius_km * 1000
        )
    ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate distance between two points (in km)
CREATE OR REPLACE FUNCTION calculate_distance_km(
    lat1 DOUBLE PRECISION,
    lng1 DOUBLE PRECISION,
    lat2 DOUBLE PRECISION,
    lng2 DOUBLE PRECISION
)
RETURNS DOUBLE PRECISION AS $$
BEGIN
    RETURN ST_Distance(
        ST_SetSRID(ST_MakePoint(lng1, lat1), 4326)::geography,
        ST_SetSRID(ST_MakePoint(lng2, lat2), 4326)::geography
    ) / 1000.0;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get match participation count
CREATE OR REPLACE FUNCTION get_match_participant_count(match_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM match_participations
        WHERE match_id = match_uuid
        AND status = 'joined'
    );
END;
$$ LANGUAGE plpgsql STABLE;

-- View for matches with participant counts
CREATE OR REPLACE VIEW matches_with_counts AS
SELECT 
    m.*,
    COALESCE(pc.participant_count, 0) AS participant_count,
    CASE 
        WHEN COALESCE(pc.participant_count, 0) >= m.max_players THEN true
        ELSE false
    END AS is_full
FROM matches m
LEFT JOIN (
    SELECT 
        match_id,
        COUNT(*) AS participant_count
    FROM match_participations
    WHERE status = 'joined'
    GROUP BY match_id
) pc ON m.id = pc.match_id;

-- Function to check if user can join a match
CREATE OR REPLACE FUNCTION can_join_match(
    match_uuid UUID,
    user_uuid UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    current_count INTEGER;
    max_players INTEGER;
    match_status TEXT;
    already_joined BOOLEAN;
BEGIN
    -- Check match status
    SELECT status INTO match_status
    FROM matches
    WHERE id = match_uuid;
    
    IF match_status != 'open' THEN
        RETURN FALSE;
    END IF;
    
    -- Check if already joined
    SELECT EXISTS(
        SELECT 1 FROM match_participations
        WHERE match_id = match_uuid
        AND profile_id = user_uuid
        AND status = 'joined'
    ) INTO already_joined;
    
    IF already_joined THEN
        RETURN FALSE;
    END IF;
    
    -- Check participant count
    SELECT max_players INTO max_players
    FROM matches
    WHERE id = match_uuid;
    
    SELECT COUNT(*) INTO current_count
    FROM match_participations
    WHERE match_id = match_uuid
    AND status = 'joined';
    
    RETURN current_count < max_players;
END;
$$ LANGUAGE plpgsql STABLE;


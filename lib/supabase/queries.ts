import { supabase } from './client';
import type { Database } from '../types/database';

// Type helpers
type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type Profile = Tables<'profiles'>;
export type Match = Tables<'matches'>;
export type MatchParticipation = Tables<'match_participations'>;
export type Venue = Tables<'venues'>;
export type Message = Tables<'messages'>;
export type Rating = Tables<'ratings'>;
export type Report = Tables<'reports'>;
export type Notification = Tables<'notifications'>;

// Match queries
export async function getMatchesNearby(
  latitude: number,
  longitude: number,
  radiusKm: number = 10,
  filters?: {
    status?: string[];
    skillLevel?: string;
    scheduledAfter?: Date;
  }
) {
  // Try using RPC function first, fallback to basic query if not available
  try {
    const { data, error } = await supabase.rpc('get_matches_nearby', {
      user_lat: latitude,
      user_lng: longitude,
      radius_km: radiusKm,
      match_status: filters?.status || ['open', 'full'],
      skill_preference: filters?.skillLevel || null,
      scheduled_after: filters?.scheduledAfter?.toISOString() || null,
    });

    if (error) throw error;

    // If RPC returns data, fetch full match details
    if (data && data.length > 0) {
      const matchIds = data.map((item: any) => item.match_id);
      const { data: matches, error: matchesError } = await supabase
        .from('matches')
        .select(`
          *,
          venue:venues(*),
          created_by_profile:profiles!matches_created_by_fkey(*),
          participations:match_participations(
            *,
            profile:profiles(*)
          )
        `)
        .in('id', matchIds)
        .order('scheduled_at', { ascending: true });

      if (matchesError) throw matchesError;
      return matches;
    }

    return [];
  } catch (rpcError) {
    // Fallback: Use basic query with PostGIS filter
    // This requires the PostGIS function to be set up
    // For now, return a simpler query
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        venue:venues(*),
        created_by_profile:profiles!matches_created_by_fkey(*),
        participations:match_participations(
          *,
          profile:profiles(*)
        )
      `)
      .in('status', filters?.status || ['open', 'full'])
      .gte('scheduled_at', filters?.scheduledAfter?.toISOString() || new Date().toISOString())
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    
    // Note: Distance filtering will work properly once PostGIS function is set up
    // For now, return all matches matching status and date filters
    return data || [];
  }
}

export async function getMatchById(matchId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      venue:venues(*),
      created_by_profile:profiles!matches_created_by_fkey(*),
      participations:match_participations(
        *,
        profile:profiles(*)
      ),
      chat_thread:chat_threads(
        id,
        messages:messages(
          *,
          sender:profiles(*)
        )
      )
    `)
    .eq('id', matchId)
    .single();

  if (error) throw error;
  return data;
}

export async function createMatch(matchData: {
  venue_id: string;
  scheduled_at: string;
  duration_minutes?: number;
  max_players?: number;
  skill_level_preference?: string;
  description?: string;
}) {
  // This should be done via Edge Function for security
  const { data, error } = await supabase
    .from('matches')
    .insert({
      ...matchData,
      created_by: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function joinMatch(matchId: string) {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('match_participations')
    .insert({
      match_id: matchId,
      profile_id: userId,
      status: 'joined',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function leaveMatch(matchId: string) {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('match_participations')
    .update({
      status: 'left',
      left_at: new Date().toISOString(),
    })
    .eq('match_id', matchId)
    .eq('profile_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Profile queries
export async function getProfile(userId?: string) {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetUserId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(updates: Partial<Profile>) {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Venue queries
export async function getVenues() {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

// Chat queries
export async function getChatMessages(threadId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles(*)
    `)
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function sendMessage(threadId: string, content: string) {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('messages')
    .insert({
      thread_id: threadId,
      sender_id: userId,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Rating queries
export async function createRating(ratingData: {
  rated_id: string;
  match_id?: string;
  rating: number;
  comment?: string;
}) {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('ratings')
    .insert({
      ...ratingData,
      rater_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}


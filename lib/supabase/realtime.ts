import { supabase } from './client';
import { RealtimeChannel } from '@supabase/supabase-js';

/**
 * Subscribe to match roster changes (participants joining/leaving)
 */
export function subscribeToMatchRoster(
  matchId: string,
  callback: (payload: any) => void
): RealtimeChannel {
  return supabase
    .channel(`match:${matchId}:participations`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'match_participations',
        filter: `match_id=eq.${matchId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to chat messages for a match
 */
export function subscribeToChatMessages(
  threadId: string,
  callback: (payload: any) => void
): RealtimeChannel {
  return supabase
    .channel(`chat:${threadId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `thread_id=eq.${threadId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to match updates
 */
export function subscribeToMatchUpdates(
  matchId: string,
  callback: (payload: any) => void
): RealtimeChannel {
  return supabase
    .channel(`match:${matchId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'matches',
        filter: `id=eq.${matchId}`,
      },
      callback
    )
    .subscribe();
}


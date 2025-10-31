import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as Location from 'expo-location';
import {
  getMatchesNearby,
  getMatchById,
  createMatch,
  joinMatch,
  leaveMatch,
} from '../supabase/queries';

// Query matches nearby
export function useMatchesNearby(
  latitude?: number,
  longitude?: number,
  radiusKm: number = 10,
  filters?: {
    status?: string[];
    skillLevel?: string;
    scheduledAfter?: Date;
  },
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['matches', 'nearby', latitude, longitude, radiusKm, filters],
    queryFn: () => {
      if (!latitude || !longitude) {
        throw new Error('Location required');
      }
      return getMatchesNearby(latitude, longitude, radiusKm, filters);
    },
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 30000, // 30 seconds
  });
}

// Query match by ID
export function useMatch(matchId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['matches', matchId],
    queryFn: () => getMatchById(matchId),
    enabled: enabled && !!matchId,
  });
}

// Create match mutation
export function useCreateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      // Invalidate matches queries to refetch
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}

// Join match mutation
export function useJoinMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinMatch,
    onSuccess: (data, variables) => {
      // Invalidate specific match and nearby matches
      queryClient.invalidateQueries({ queryKey: ['matches', variables] });
      queryClient.invalidateQueries({ queryKey: ['matches', 'nearby'] });
    },
  });
}

// Leave match mutation
export function useLeaveMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveMatch,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['matches', variables] });
      queryClient.invalidateQueries({ queryKey: ['matches', 'nearby'] });
    },
  });
}


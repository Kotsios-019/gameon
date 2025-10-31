export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string
          avatar_url: string | null
          preferred_position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward' | 'any'
          skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          avatar_url?: string | null
          preferred_position?: 'goalkeeper' | 'defender' | 'midfielder' | 'forward' | 'any'
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          avatar_url?: string | null
          preferred_position?: 'goalkeeper' | 'defender' | 'midfielder' | 'forward' | 'any'
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          created_by: string
          venue_id: string
          scheduled_at: string
          duration_minutes: number
          max_players: number
          skill_level_preference: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null
          status: 'open' | 'full' | 'cancelled' | 'completed'
          description: string | null
          location: unknown // PostGIS Geography
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_by: string
          venue_id: string
          scheduled_at: string
          duration_minutes?: number
          max_players?: number
          skill_level_preference?: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null
          status?: 'open' | 'full' | 'cancelled' | 'completed'
          description?: string | null
          location: unknown
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          created_by?: string
          venue_id?: string
          scheduled_at?: string
          duration_minutes?: number
          max_players?: number
          skill_level_preference?: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null
          status?: 'open' | 'full' | 'cancelled' | 'completed'
          description?: string | null
          location?: unknown
          created_at?: string
          updated_at?: string
        }
      }
      match_participations: {
        Row: {
          id: string
          match_id: string
          profile_id: string
          status: 'joined' | 'left' | 'removed'
          joined_at: string
          left_at: string | null
          show_up_count: number
          no_show_count: number
        }
        Insert: {
          id?: string
          match_id: string
          profile_id: string
          status?: 'joined' | 'left' | 'removed'
          joined_at?: string
          left_at?: string | null
          show_up_count?: number
          no_show_count?: number
        }
        Update: {
          id?: string
          match_id?: string
          profile_id?: string
          status?: 'joined' | 'left' | 'removed'
          joined_at?: string
          left_at?: string | null
          show_up_count?: number
          no_show_count?: number
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          address: string
          google_places_id: string | null
          location: unknown // PostGIS Geography
          city: string | null
          country: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          google_places_id?: string | null
          location: unknown
          city?: string | null
          country?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          google_places_id?: string | null
          location?: unknown
          city?: string | null
          country?: string
          created_at?: string
        }
      }
      chat_threads: {
        Row: {
          id: string
          match_id: string
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          thread_id: string
          sender_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          sender_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          thread_id?: string
          sender_id?: string
          content?: string
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          rater_id: string
          rated_id: string
          match_id: string | null
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          rater_id: string
          rated_id: string
          match_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          rater_id?: string
          rated_id?: string
          match_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          reported_id: string
          match_id: string | null
          reason: string
          status: 'pending' | 'reviewed' | 'resolved'
          created_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          reporter_id: string
          reported_id: string
          match_id?: string | null
          reason: string
          status?: 'pending' | 'reviewed' | 'resolved'
          created_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          reporter_id?: string
          reported_id?: string
          match_id?: string | null
          reason?: string
          status?: 'pending' | 'reviewed' | 'resolved'
          created_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'match_reminder' | 'match_joined' | 'match_cancelled' | 'match_full' | 'message' | 'rating_received'
          title: string
          body: string
          data: Json | null
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'match_reminder' | 'match_joined' | 'match_cancelled' | 'match_full' | 'message' | 'rating_received'
          title: string
          body: string
          data?: Json | null
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'match_reminder' | 'match_joined' | 'match_cancelled' | 'match_full' | 'message' | 'rating_received'
          title?: string
          body?: string
          data?: Json | null
          read_at?: string | null
          created_at?: string
        }
      }
      devices: {
        Row: {
          id: string
          user_id: string
          expo_push_token: string
          platform: 'ios' | 'android'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          expo_push_token: string
          platform: 'ios' | 'android'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          expo_push_token?: string
          platform?: 'ios' | 'android'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
      position_preference: 'goalkeeper' | 'defender' | 'midfielder' | 'forward' | 'any'
      match_status: 'open' | 'full' | 'cancelled' | 'completed'
      participation_status: 'joined' | 'left' | 'removed'
      report_status: 'pending' | 'reviewed' | 'resolved'
      notification_type: 'match_reminder' | 'match_joined' | 'match_cancelled' | 'match_full' | 'message' | 'rating_received'
    }
  }
}


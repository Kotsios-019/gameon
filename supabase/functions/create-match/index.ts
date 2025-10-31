// Supabase Edge Function: Create Match
// This function handles protected match creation with validation

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Parse request body
    const {
      venue_id,
      scheduled_at,
      duration_minutes = 90,
      max_players = 10,
      skill_level_preference,
      description,
    } = await req.json();

    // Validate required fields
    if (!venue_id || !scheduled_at) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: venue_id, scheduled_at' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate scheduled_at is in the future
    const scheduledTime = new Date(scheduled_at);
    if (scheduledTime <= new Date()) {
      return new Response(
        JSON.stringify({ error: 'scheduled_at must be in the future' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get venue location
    const { data: venue, error: venueError } = await supabaseClient
      .from('venues')
      .select('location')
      .eq('id', venue_id)
      .single();

    if (venueError || !venue) {
      return new Response(
        JSON.stringify({ error: 'Venue not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create match
    const { data: match, error: matchError } = await supabaseClient
      .from('matches')
      .insert({
        created_by: user.id,
        venue_id,
        scheduled_at: scheduled_at,
        duration_minutes,
        max_players,
        skill_level_preference,
        description,
        location: venue.location, // Use venue location
        status: 'open',
      })
      .select()
      .single();

    if (matchError) {
      throw matchError;
    }

    // Auto-join the match creator
    await supabaseClient.from('match_participations').insert({
      match_id: match.id,
      profile_id: user.id,
      status: 'joined',
    });

    return new Response(
      JSON.stringify({ match }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});


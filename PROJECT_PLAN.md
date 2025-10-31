# Game On - Project Plan

## Overview
Mobile app for finding and joining mini football (5-a-side) matches. Users can create matches, invite friends, discover nearby games, and join available slots.

## MVP Requirements

### Core Features
- ✅ **Match Management**
  - Create match (time, venue, size)
  - Join/leave matches
  - View match details and roster

- ✅ **Discovery**
  - List view of nearby matches
  - Map view with location markers
  - Filters (distance, time, skill level, etc.)

- ✅ **Player Profiles**
  - Position preferences
  - Skill level indicators
  - Reliability metrics

- ✅ **Communication**
  - Per-match chat threads
  - Realtime messaging

- ✅ **Notifications**
  - Push reminders for upcoming matches
  - Match updates (new participants, changes)

- ✅ **Feedback**
  - Rate other players
  - Report issues

## Tech Stack

### Frontend
- **Framework:** React Native + Expo
- **Navigation:** React Navigation v6
- **State/Data:** React Query (TanStack Query)
- **Forms:** react-hook-form + zod
- **Maps:** react-native-maps
- **UI:** Native Base / React Native Elements

### Backend
- **Platform:** Supabase (EU region)
- **Database:** PostgreSQL + PostGIS
- **Auth:** Supabase Auth
- **Realtime:** Supabase Realtime
- **Storage:** Supabase Storage
- **Functions:** Supabase Edge Functions (TypeScript)

### Infrastructure
- **Notifications:** Expo Push Notifications
- **Analytics:** Amplitude / Mixpanel
- **Monitoring:** Sentry
- **CI/CD:** GitHub Actions + EAS Builds

## Architecture

```
┌─────────────────┐
│  React Native   │
│   App (Expo)    │
│                 │
│  - Auth         │
│  - Maps         │
│  - Realtime     │
└────────┬────────┘
         │
         │ HTTPS
         │
┌────────▼────────┐
│    Supabase     │
│                 │
│  - Postgres     │
│  - PostGIS      │
│  - Auth         │
│  - Realtime     │
│  - Storage      │
│  - Edge Funcs   │
└─────────────────┘
```

### Data Flow
1. **Authentication:** Supabase Auth handles user login/signup
2. **Data Access:** Row-Level Security (RLS) policies control access
3. **Realtime:** Subscriptions for chat and match roster updates
4. **Geospatial:** PostGIS queries for "matches near me"
5. **Protected Operations:** Edge Functions for create_match, join, report

## Database Schema

### Core Entities

1. **User** (auth.users + profiles)
2. **Profile** - user profiles with positions and skills
3. **Venue** - match locations with PostGIS points
4. **Match** - match details and status
5. **MatchParticipation** - join/leave tracking
6. **ChatThread** - per-match chat
7. **Message** - chat messages
8. **Rating** - player ratings
9. **Report** - reporting system
10. **Notification** - in-app notifications
11. **Device** - push notification tokens

## Development Phases

### Phase 1: Foundation (Week 1-2)
- Project setup and structure
- Supabase project creation
- Database schema implementation
- RLS policies setup
- Basic authentication flow
- Navigation structure

### Phase 2: Core Features (Week 3-4)
- User profile creation/editing
- Venue management (static list)
- Match creation
- Match discovery (list view)
- Join/leave match

### Phase 3: Discovery & Maps (Week 5-6)
- PostGIS integration
- Location-based queries
- Map view with markers
- Filters implementation

### Phase 4: Communication (Week 7-8)
- Chat thread creation
- Realtime messaging
- Push notifications setup

### Phase 5: Polish & Feedback (Week 9-10)
- Rating system
- Reporting system
- Profile reliability metrics
- UI/UX refinements

### Phase 6: Deployment (Week 11-12)
- EAS build setup
- App store preparation
- Analytics integration
- Beta testing


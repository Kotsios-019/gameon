# Game On - Implementation Roadmap

## Overview
This roadmap breaks down the MVP development into manageable phases with clear deliverables.

## Phase 1: Foundation & Setup (Week 1-2)

### ✅ Completed
- [x] Project structure created
- [x] Database schema designed
- [x] Supabase migrations ready
- [x] Type definitions
- [x] Basic Supabase client setup
- [x] Query functions skeleton

### Next Steps
1. **Set up Supabase project**
   - Create Supabase account
   - Create new project (EU region)
   - Enable PostGIS extension
   - Run migration files

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `env.example` to `.env`
   - Add Supabase credentials
   - Get Google Maps API key

4. **Test basic setup**
   - Run `npm start`
   - Verify Expo dev server starts
   - Test Supabase connection

## Phase 2: Authentication (Week 2-3)

### Tasks
- [ ] Create login screen
- [ ] Create signup screen
- [ ] Implement authentication flow
- [ ] Create profile setup screen (first-time user)
- [ ] Add session persistence
- [ ] Handle authentication errors

### Files to Create
- `app/(auth)/login.tsx`
- `app/(auth)/signup.tsx`
- `app/(auth)/onboarding.tsx`
- `components/auth/LoginForm.tsx`
- `components/auth/SignupForm.tsx`

### Design Considerations
- Use Lovable.dev or Ripple.dev to generate initial UI
- Or design in Figma first, then implement
- Keep it simple and clean

## Phase 3: Profile & Settings (Week 3)

### Tasks
- [ ] Create profile screen
- [ ] Implement profile editing
- [ ] Add position preference selector
- [ ] Add skill level selector
- [ ] Add avatar upload (use Supabase Storage)
- [ ] Display profile stats (matches played, ratings)

### Files to Create
- `app/(tabs)/profile.tsx`
- `app/profile/edit.tsx`
- `components/profile/ProfileCard.tsx`
- `components/profile/SkillSelector.tsx`
- `components/profile/PositionSelector.tsx`

## Phase 4: Match Creation (Week 4)

### Tasks
- [ ] Create "New Match" screen
- [ ] Implement venue selection (dropdown or map picker)
- [ ] Add date/time picker
- [ ] Add match details form (max players, skill level, description)
- [ ] Connect to Supabase Edge Function or direct insert
- [ ] Validate match creation
- [ ] Auto-join creator to match

### Files to Create
- `app/matches/new.tsx`
- `components/matches/CreateMatchForm.tsx`
- `components/matches/VenuePicker.tsx`
- `components/matches/DateTimePicker.tsx`

### Validation Rules
- Scheduled time must be in future
- Max players must be at least 4 (2v2 minimum)
- Required fields: venue, scheduled_at

## Phase 5: Match Discovery - List View (Week 5)

### Tasks
- [ ] Create matches feed screen
- [ ] Implement location detection
- [ ] Fetch nearby matches using PostGIS
- [ ] Display match cards in list
- [ ] Show match details (time, venue, participants)
- [ ] Add pull-to-refresh
- [ ] Add loading states
- [ ] Handle empty states

### Files to Create
- `app/(tabs)/matches.tsx`
- `components/matches/MatchCard.tsx`
- `components/matches/MatchList.tsx`
- `components/matches/EmptyState.tsx`

### Match Card Should Show
- Match time (relative + absolute)
- Venue name and distance
- Current participants / max players
- Skill level preference
- Status badge (open/full)
- Join button (if open and space available)

## Phase 6: Match Discovery - Map View (Week 5-6)

### Tasks
- [ ] Create map screen
- [ ] Integrate react-native-maps
- [ ] Display match markers on map
- [ ] Show match info on marker tap
- [ ] Toggle between list and map view
- [ ] Add map filters (distance, time)
- [ ] Handle map region changes
- [ ] Add user location marker

### Files to Create
- `app/matches/map.tsx`
- `components/matches/MapView.tsx`
- `components/matches/MatchMarker.tsx`
- `components/matches/MapInfoWindow.tsx`

## Phase 7: Match Details & Join/Leave (Week 6)

### Tasks
- [ ] Create match detail screen
- [ ] Display full match information
- [ ] Show participant list with avatars
- [ ] Implement join match functionality
- [ ] Implement leave match functionality
- [ ] Handle match full state
- [ ] Add realtime updates for roster changes
- [ ] Show distance to venue

### Files to Create
- `app/matches/[id].tsx`
- `components/matches/MatchDetails.tsx`
- `components/matches/ParticipantList.tsx`
- `components/matches/JoinButton.tsx`

### Realtime Integration
- Subscribe to match_participations changes
- Update UI when someone joins/leaves
- Show toast/notification for roster updates

## Phase 8: Filters & Search (Week 7)

### Tasks
- [ ] Add filter UI component
- [ ] Implement filter by distance
- [ ] Implement filter by time (today, tomorrow, this week)
- [ ] Implement filter by skill level
- [ ] Implement filter by status
- [ ] Save filter preferences
- [ ] Add search by venue name

### Files to Create
- `components/filters/FilterPanel.tsx`
- `components/filters/DistanceFilter.tsx`
- `components/filters/TimeFilter.tsx`
- `components/filters/SkillFilter.tsx`

## Phase 9: Chat (Week 7-8)

### Tasks
- [ ] Create chat screen
- [ ] Display messages in thread
- [ ] Implement send message
- [ ] Add realtime message subscription
- [ ] Display sender info (avatar, name)
- [ ] Format timestamps
- [ ] Handle message sending states
- [ ] Add input validation

### Files to Create
- `app/matches/[id]/chat.tsx`
- `components/chat/ChatScreen.tsx`
- `components/chat/MessageList.tsx`
- `components/chat/MessageBubble.tsx`
- `components/chat/MessageInput.tsx`

### Realtime Integration
- Subscribe to messages table for thread_id
- Display new messages as they arrive
- Scroll to bottom on new message

## Phase 10: Notifications (Week 8)

### Tasks
- [ ] Set up Expo push notifications
- [ ] Request notification permissions
- [ ] Register device tokens
- [ ] Store tokens in devices table
- [ ] Create notification service
- [ ] Send match reminders
- [ ] Send match updates (joined, cancelled)
- [ ] Handle notification taps
- [ ] Display in-app notifications

### Files to Create
- `lib/services/notifications.ts`
- `components/notifications/NotificationCenter.tsx`
- `app/notifications.tsx`

### Notification Types
- Match reminder (1 hour before)
- Someone joined your match
- Match cancelled
- Match full
- New message
- Rating received

## Phase 11: Ratings & Reports (Week 9)

### Tasks
- [ ] Create rating screen/modal
- [ ] Allow rating after match completion
- [ ] Display rating form (stars, comment)
- [ ] Submit rating
- [ ] Display ratings on profile
- [ ] Create report screen
- [ ] Implement reporting functionality
- [ ] Show report confirmation

### Files to Create
- `app/matches/[id]/rate.tsx`
- `components/ratings/RatingForm.tsx`
- `components/ratings/RatingDisplay.tsx`
- `app/report.tsx`
- `components/reports/ReportForm.tsx`

## Phase 12: Polish & Testing (Week 10)

### Tasks
- [ ] Fix UI/UX issues
- [ ] Add loading skeletons
- [ ] Improve error handling
- [ ] Add empty states everywhere
- [ ] Test on iOS device
- [ ] Test on Android device
- [ ] Fix any location permission issues
- [ ] Optimize performance
- [ ] Add analytics events
- [ ] Set up Sentry error tracking

## Phase 13: Deployment Prep (Week 11)

### Tasks
- [ ] Set up EAS Build
- [ ] Configure app icons and splash screens
- [ ] Set up app store accounts (iOS & Android)
- [ ] Create store listings
- [ ] Prepare screenshots
- [ ] Write app description
- [ ] Set up CI/CD with GitHub Actions
- [ ] Configure build profiles (dev/staging/prod)

## Phase 14: Beta Testing (Week 11-12)

### Tasks
- [ ] Distribute beta builds
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Iterate based on feedback
- [ ] Prepare for production launch

## UI/UX Tools Recommendation

### Option 1: Figma → Lovable.dev
1. Design screens in Figma
2. Export designs
3. Use Lovable.dev to generate React Native code
4. Refine and integrate

### Option 2: Figma → Ripple.dev
1. Design screens in Figma
2. Use Ripple.dev to convert to code
3. Refine and integrate

### Option 3: Design in Code
- Start with basic components
- Iterate and refine
- Use libraries like NativeBase or React Native Elements

## Recommended Order for Development

1. **Week 1-2:** Setup + Authentication (Phase 1-2)
2. **Week 3:** Profile (Phase 3)
3. **Week 4:** Match Creation (Phase 4)
4. **Week 5:** Match Discovery - List (Phase 5)
5. **Week 5-6:** Match Discovery - Map (Phase 6)
6. **Week 6:** Match Details & Join/Leave (Phase 7)
7. **Week 7:** Filters + Chat (Phase 8-9)
8. **Week 8:** Notifications (Phase 10)
9. **Week 9:** Ratings & Reports (Phase 11)
10. **Week 10:** Polish (Phase 12)
11. **Week 11-12:** Deployment & Beta (Phase 13-14)

## Quick Start Development Tips

1. **Start Simple:** Build the simplest version of each feature first
2. **Test Often:** Test on real devices early
3. **Iterate:** Don't try to perfect everything at once
4. **Use Realtime:** Leverage Supabase Realtime for live updates
5. **Handle Errors:** Always handle errors gracefully
6. **Loading States:** Show loading indicators everywhere
7. **Empty States:** Design for empty data states

## Next Immediate Steps

1. **Today:** Set up Supabase project and run migrations
2. **This Week:** Get authentication working
3. **Next Week:** Build first match creation flow

Good luck! 🚀


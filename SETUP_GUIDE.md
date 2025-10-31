# Game On - Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

#### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. **Important:** Select **EU (West)** region for GDPR compliance
4. Note down your project URL and anon key

#### 2.2 Enable PostGIS Extension
1. In Supabase dashboard, go to **Database** → **Extensions**
2. Search for "postgis" and enable it

#### 2.3 Run Database Migrations
1. Go to **SQL Editor** in Supabase dashboard
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run `supabase/migrations/002_postgis_functions.sql`
4. Verify tables were created (Database → Tables)

#### 2.4 Set Up Edge Functions (Optional for MVP)
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref your-project-ref`
4. Deploy functions: `supabase functions deploy create-match`

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### 4. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Maps SDK for Android** and **Maps SDK for iOS**
4. Create API key
5. Add it to your `.env` file

### 5. Start Development Server

```bash
npm start
```

This will start Expo development server. You can:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Initial Data Setup

### Add Sample Venues

Run this SQL in Supabase SQL Editor to add some sample venues (adjust coordinates for your location):

```sql
-- Example: Athens, Greece venues
INSERT INTO venues (name, address, location, city, country) VALUES
('Soccer Field Athens', 'Example Street 1, Athens', ST_SetSRID(ST_MakePoint(23.7275, 37.9838), 4326)::geography, 'Athens', 'Greece'),
('Sports Center', 'Example Street 2, Athens', ST_SetSRID(ST_MakePoint(23.7375, 37.9938), 4326)::geography, 'Athens', 'Greece');
```

### Test User Creation

Users will be automatically created when they sign up. The trigger `handle_new_user` will create a profile automatically.

## Testing the App

### 1. Authentication
- Sign up a new user
- Check that profile is automatically created
- Try logging in/out

### 2. Create Match
- Navigate to create match screen
- Fill in match details
- Submit and verify match appears in feed

### 3. Discovery
- Allow location permissions
- View matches in list/map view
- Test filters

## Common Issues

### PostGIS errors
- Make sure PostGIS extension is enabled
- Verify migration ran successfully

### Location permissions
- On iOS: Add location permissions to `app.json`
- On Android: Permissions are in `app.json`

### Supabase connection
- Check your `.env` file has correct credentials
- Verify Supabase project is active

## Next Steps

1. **Design UI:** Use Figma to design screens, then use Lovable.dev or Ripple.dev to generate initial code
2. **Implement Screens:** Start with authentication, then match creation, then discovery
3. **Add Features:** Implement chat, notifications, ratings one by one
4. **Test:** Test on real devices early and often

## Development Tips

- Use React Query DevTools to debug data fetching
- Use Supabase Dashboard to monitor database changes
- Enable Supabase Realtime logs to debug subscriptions
- Use Expo DevTools for debugging React Native issues

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [React Query](https://tanstack.com/query/latest)


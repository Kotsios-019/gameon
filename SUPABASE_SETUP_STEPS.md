# Supabase Setup Steps - Game On

## Step 1: Enable PostGIS Extension

1. In the left sidebar, click on **Database** (grid icon)
2. Go to the **Extensions** tab (or click on "Extensions" in the database menu)
3. Search for "**postgis**" in the search bar
4. Find "**PostGIS**" in the list
5. Click the toggle or **Enable** button next to it
6. Wait for it to enable (should only take a few seconds)

**Why?** PostGIS allows us to do location-based queries (finding matches near you).

---

## Step 2: Run Database Migrations

Now we'll create all the tables, relationships, and security policies.

1. In the left sidebar, click on **SQL Editor** (or go to Database → SQL Editor)
2. Click "**New query**" button
3. Open the file `supabase/migrations/001_initial_schema.sql` from your project
4. **Copy ALL the contents** of that file
5. **Paste it into the SQL Editor** in Supabase
6. Click **Run** (or press Ctrl+Enter / Cmd+Enter)
7. Wait for it to complete - you should see "Success. No rows returned" or similar
8. Click **New query** again
9. Open the file `supabase/migrations/002_postgis_functions.sql` from your project
10. **Copy ALL the contents** of that file
11. **Paste it into the SQL Editor**
12. Click **Run**

**What this does:**
- Creates all tables (profiles, matches, venues, etc.)
- Sets up relationships between tables
- Creates Row-Level Security policies
- Sets up triggers for auto-creating profiles and chat threads
- Creates PostGIS functions for location queries

---

## Step 3: Verify Tables Were Created

1. In the left sidebar, click on **Table Editor** (or go to Database → Tables)
2. You should see these tables:
   - profiles
   - venues
   - matches
   - match_participations
   - chat_threads
   - messages
   - ratings
   - reports
   - notifications
   - devices

If you see all these tables, you're good! ✅

---

## Step 4: Get Your API Credentials

1. In the left sidebar, click on **Settings** (gear icon)
2. Click on **API** in the settings menu
3. You'll see two important values:

   **Project URL:**
   - Copy this - it looks like: `https://xxxxx.supabase.co`
   
   **anon/public key:**
   - Click the "eye" icon to reveal it
   - Copy the key that starts with `eyJ...`

4. Keep these credentials safe - you'll need them for your `.env` file

---

## Step 5: Set Up Environment Variables

1. In your project, make sure you have a `.env` file (copy from `env.example` if needed)
2. Add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project-id.supabase.co` with your actual Project URL
- `your-anon-key-here` with your actual anon key

**Important:** 
- Make sure both values start with `EXPO_PUBLIC_`
- Don't share your `.env` file publicly (it's in `.gitignore`)

---

## Step 6: (Optional) Add Sample Venues

To test the app later, you might want some sample venues. In SQL Editor, run:

```sql
-- Example: Athens, Greece venues (adjust coordinates for your location)
INSERT INTO venues (name, address, location, city, country) VALUES
('Soccer Field Athens', 'Example Street 1, Athens', ST_SetSRID(ST_MakePoint(23.7275, 37.9838), 4326)::geography, 'Athens', 'Greece'),
('Sports Center', 'Example Street 2, Athens', ST_SetSRID(ST_MakePoint(23.7375, 37.9938), 4326)::geography, 'Athens', 'Greece');
```

(Adjust the coordinates and names for your actual location)

---

## ✅ You're Done!

Your Supabase setup is complete. You can now:
1. Start the Expo dev server: `npm start`
2. Begin building authentication screens
3. Test the connection to Supabase

---

## Troubleshooting

**PostGIS not showing up:**
- Make sure you're looking in Database → Extensions
- Try refreshing the page

**Migration errors:**
- Make sure PostGIS is enabled first
- Check that you copied the entire migration file
- Look at the error message for specific issues

**Can't find API credentials:**
- Go to Settings → API
- Make sure you're in the right project

**Still having issues?**
- Check the Supabase dashboard for any error messages
- Verify your project is active and not paused


# Game On 🏆

Mobile app for finding and joining mini football (5-a-side) matches. Connect with players, discover nearby games, and join the action!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Supabase account (EU region)
- Google Maps API key (for map features)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your Supabase and Google Maps credentials
```

3. **Set up Supabase:**
   - Create a new Supabase project (select EU region)
   - Enable PostGIS extension in your database
   - Run the migration file: `supabase/migrations/001_initial_schema.sql`
   - Get your project URL and anon key from Supabase dashboard

4. **Start the development server:**
```bash
npm start
```

## 📁 Project Structure

```
gameon/
├── app/                    # Expo Router screens
├── components/             # Reusable UI components
├── lib/
│   ├── supabase/          # Supabase client, queries, realtime
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   └── types/             # TypeScript types
├── services/              # Business logic
├── assets/                # Images, fonts, etc.
├── supabase/
│   ├── migrations/        # Database migrations
│   └── functions/         # Edge Functions
└── docs/                  # Documentation
```

## 🗄️ Database Setup

1. In Supabase dashboard, go to SQL Editor
2. Run the migration: `supabase/migrations/001_initial_schema.sql`
3. This will create:
   - All tables with proper relationships
   - PostGIS extension for geospatial queries
   - Row-Level Security policies
   - Triggers for auto-creating profiles and chat threads

## 🔧 Key Features

### MVP Features
- ✅ User authentication and profiles
- ✅ Create and manage matches
- ✅ Discover matches (list and map views)
- ✅ Join/leave matches
- ✅ Per-match chat
- ✅ Push notifications
- ✅ Player ratings and reporting

### Tech Stack
- **Frontend:** React Native + Expo
- **Backend:** Supabase (PostgreSQL + PostGIS)
- **Maps:** react-native-maps + Google Maps API
- **State:** React Query
- **Navigation:** React Navigation

## 📱 Development

### Running on iOS
```bash
npm run ios
```

### Running on Android
```bash
npm run android
```

### Type checking
```bash
npm run type-check
```

## 🚢 Deployment

### Building with EAS

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

4. Build for production:
```bash
eas build --platform ios
eas build --platform android
```

## 📚 Documentation

- [Project Plan](./PROJECT_PLAN.md) - Detailed development roadmap
- [Supabase Docs](https://supabase.com/docs)
- [Expo Docs](https://docs.expo.dev/)

## 🤝 Contributing

This is a startup project. Contributions welcome!

## 📄 License

Private - All rights reserved


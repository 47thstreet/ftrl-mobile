# FTRL Mobile

Mobile app for DJs on the FTRL (Future Productions) platform. Manage your profile, upload mixes, track bookings, set availability, and monitor analytics from your phone.

## Tech Stack

- **Runtime**: Expo SDK 55 / React Native 0.83
- **Navigation**: React Navigation 7 (bottom tabs + stack)
- **Audio**: expo-av (mix playback and upload)
- **Media**: expo-image-picker (profile and EPK photos)
- **Calendar**: react-native-calendars (availability management)
- **Gradient**: expo-linear-gradient (UI styling)
- **Language**: TypeScript 5.9

## Screens

| Screen | Description |
|--------|-------------|
| `ProfileScreen` | Edit DJ bio, genres, photo, social links |
| `TracksScreen` | Browse and manage uploaded mixes and tracks |
| `EventsScreen` | Upcoming and past gig listings |
| `BookingsScreen` | Booking requests, confirmations, and history |
| `AnalyticsScreen` | Play counts, profile views, engagement charts |
| `AvailabilityScreen` | Calendar-based availability management |
| `CollabFinderScreen` | Discover and connect with other DJs for collabs |
| `EPKScreen` | Electronic Press Kit builder and sharing |
| `MixUploadScreen` | Upload audio files with metadata and artwork |
| `MoreScreen` | Settings, account, support |

## Components

| Component | Description |
|-----------|-------------|
| `SectionHeader` | Consistent section title with optional action |
| `StatCard` | Metric display with icon and trend |
| `StatusBadge` | Color-coded status indicator (confirmed, pending, etc.) |
| `WaveformPlayer` | Audio waveform visualization with playback controls |

## Project Structure

```
src/
  screens/          # 10 screen components + index
  components/       # 4 shared components
  navigation/       # Tab and stack navigators
  services/         # API client (connects to FTRL backend)
  types/            # TypeScript interfaces
```

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Environment

The app connects to the FTRL DJ API backend:

| Variable | Description |
|----------|-------------|
| `FTRL_API_URL` | FTRL backend API endpoint |

## Related

- [ftrl-dj](../ftrl-dj) -- Backend DJ platform (Astro SSR)
- [kartis-astro](../kartis-astro) -- Nightlife discovery platform

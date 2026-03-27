import { DJProfile, Track, Booking, Event, AnalyticsData, AvailabilityDate } from '../types';

export const mockProfile: DJProfile = {
  id: '1',
  name: 'DJ NOVA',
  bio: 'Underground house and techno DJ based in Miami. Resident at Club Space. 10+ years crafting immersive sonic experiences across festivals and intimate venues.',
  genres: ['House', 'Techno', 'Deep House', 'Afro House'],
  photoUri: null,
  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com/djnova', icon: 'logo-instagram' },
    { platform: 'SoundCloud', url: 'https://soundcloud.com/djnova', icon: 'musical-notes' },
    { platform: 'Spotify', url: 'https://open.spotify.com/artist/djnova', icon: 'musical-note' },
  ],
  location: 'Miami, FL',
  yearsActive: 12,
};

export const mockTracks: Track[] = [
  { id: '1', title: 'Midnight Circuit', duration: 378, genre: 'Techno', bpm: 128, artworkUri: null, audioUri: null, plays: 12450, uploadedAt: '2026-03-15' },
  { id: '2', title: 'Neon Dreams', duration: 295, genre: 'Deep House', bpm: 122, artworkUri: null, audioUri: null, plays: 8920, uploadedAt: '2026-03-01' },
  { id: '3', title: 'Solar Flare', duration: 412, genre: 'House', bpm: 126, artworkUri: null, audioUri: null, plays: 6730, uploadedAt: '2026-02-20' },
  { id: '4', title: 'Astral Drift', duration: 340, genre: 'Afro House', bpm: 124, artworkUri: null, audioUri: null, plays: 5100, uploadedAt: '2026-02-10' },
  { id: '5', title: 'Deep Current', duration: 365, genre: 'Deep House', bpm: 120, artworkUri: null, audioUri: null, plays: 3200, uploadedAt: '2026-01-28' },
];

export const mockBookings: Booking[] = [
  { id: '1', venueName: 'Club Space', venueAddress: '34 NE 11th St, Miami', date: '2026-04-05', startTime: '23:00', endTime: '04:00', fee: 2500, status: 'pending', notes: 'Main room. Bring own USB.', contactName: 'Carlos Reyes', contactEmail: 'carlos@clubspace.com' },
  { id: '2', venueName: 'E11EVEN', venueAddress: '29 NE 11th St, Miami', date: '2026-04-12', startTime: '01:00', endTime: '05:00', fee: 3000, status: 'accepted', notes: 'VIP event. Dress code enforced.', contactName: 'Mike Torres', contactEmail: 'mike@e11even.com' },
  { id: '3', venueName: 'Treehouse', venueAddress: '323 23rd St, Miami Beach', date: '2026-03-28', startTime: '22:00', endTime: '03:00', fee: 1800, status: 'accepted', notes: 'Outdoor rooftop set.', contactName: 'Sarah Lin', contactEmail: 'sarah@treehousemiami.com' },
  { id: '4', venueName: 'Do Not Sit', venueAddress: '423 16th St, Miami Beach', date: '2026-03-20', startTime: '20:00', endTime: '01:00', fee: 2000, status: 'completed', notes: 'Opening for Solomun.', contactName: 'Anna Becker', contactEmail: 'anna@donotsit.com' },
  { id: '5', venueName: 'Floyd', venueAddress: '34 NE 11th St, Miami', date: '2026-03-15', startTime: '23:00', endTime: '06:00', fee: 1500, status: 'declined', notes: 'Schedule conflict.', contactName: 'James Wright', contactEmail: 'james@floyd.com' },
];

export const mockEvents: Event[] = [
  { id: '1', name: 'FTRL Presents: Night Vision', venue: 'Club Space', date: '2026-04-05', startTime: '22:00', endTime: '06:00', flyerUri: null, description: 'A night of cutting-edge techno and house music featuring resident DJs.', lineup: ['DJ NOVA', 'AXIOM', 'Pulse Theory'], ticketLink: 'https://ftrl.events/nightvision' },
  { id: '2', name: 'Sunset Sessions Vol. 8', venue: 'Treehouse', date: '2026-03-28', startTime: '18:00', endTime: '03:00', flyerUri: null, description: 'Rooftop vibes from sunset to sunrise. Deep house and afro house focus.', lineup: ['DJ NOVA', 'Kora Beats', 'Luna Wave'], ticketLink: 'https://ftrl.events/sunsetv8' },
  { id: '3', name: 'Underground Collective', venue: 'Floyd', date: '2026-04-18', startTime: '23:00', endTime: '08:00', flyerUri: null, description: 'Marathon session celebrating the raw essence of underground dance music.', lineup: ['DJ NOVA', 'Hex Machine', 'Deep Signal', 'Orbit'], ticketLink: 'https://ftrl.events/underground' },
];

export const mockAnalytics: AnalyticsData = {
  profileViews: 4250,
  profileViewsTrend: 12.5,
  trackPlays: 36400,
  trackPlaysTrend: 8.3,
  bookingRequests: 18,
  bookingRequestsTrend: 22.0,
  epkViews: 890,
  epkViewsTrend: -3.2,
  weeklyPlays: [4200, 3800, 5100, 4700, 5600, 6200, 6800],
  topTracks: [
    { name: 'Midnight Circuit', plays: 12450 },
    { name: 'Neon Dreams', plays: 8920 },
    { name: 'Solar Flare', plays: 6730 },
    { name: 'Astral Drift', plays: 5100 },
  ],
  genreBreakdown: [
    { genre: 'House', percentage: 35 },
    { genre: 'Techno', percentage: 30 },
    { genre: 'Deep House', percentage: 20 },
    { genre: 'Afro House', percentage: 15 },
  ],
};

export const mockAvailability: AvailabilityDate[] = [
  { date: '2026-04-01', available: true },
  { date: '2026-04-02', available: true },
  { date: '2026-04-03', available: false },
  { date: '2026-04-04', available: true },
  { date: '2026-04-05', available: false },
  { date: '2026-04-06', available: true },
  { date: '2026-04-07', available: true },
  { date: '2026-04-08', available: false },
  { date: '2026-04-10', available: true },
  { date: '2026-04-12', available: false },
  { date: '2026-04-15', available: true },
  { date: '2026-04-18', available: false },
  { date: '2026-04-20', available: true },
  { date: '2026-04-22', available: true },
  { date: '2026-04-25', available: true },
];

export interface DJProfile {
  id: string;
  name: string;
  bio: string;
  genres: string[];
  photoUri: string | null;
  socialLinks: SocialLink[];
  location: string;
  yearsActive: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Track {
  id: string;
  title: string;
  duration: number;
  genre: string;
  bpm: number;
  artworkUri: string | null;
  audioUri: string | null;
  plays: number;
  uploadedAt: string;
}

export interface Booking {
  id: string;
  venueName: string;
  venueAddress: string;
  date: string;
  startTime: string;
  endTime: string;
  fee: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  notes: string;
  contactName: string;
  contactEmail: string;
}

export interface Event {
  id: string;
  name: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  flyerUri: string | null;
  description: string;
  lineup: string[];
  ticketLink: string;
}

export interface AnalyticsData {
  profileViews: number;
  profileViewsTrend: number;
  trackPlays: number;
  trackPlaysTrend: number;
  bookingRequests: number;
  bookingRequestsTrend: number;
  epkViews: number;
  epkViewsTrend: number;
  weeklyPlays: number[];
  topTracks: { name: string; plays: number }[];
  genreBreakdown: { genre: string; percentage: number }[];
}

export interface AvailabilityDate {
  date: string;
  available: boolean;
}

export type RootTabParamList = {
  Profile: undefined;
  Tracks: undefined;
  Bookings: undefined;
  Events: undefined;
  More: undefined;
};

export type MoreStackParamList = {
  MoreMenu: undefined;
  Analytics: undefined;
  EPK: undefined;
  Availability: undefined;
};

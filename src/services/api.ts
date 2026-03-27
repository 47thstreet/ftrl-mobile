import {
  DJProfile,
  Track,
  Booking,
  Event,
  AnalyticsData,
  AvailabilityDate,
} from '../types';

const API_BASE = 'http://localhost:4321/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface MixUploadPayload {
  title: string;
  genre: string;
  bpm: number;
  fileUri: string;
}

export interface CollabRequest {
  djId: string;
  message: string;
  genre: string;
}

export interface NearbyDJ {
  id: string;
  name: string;
  genres: string[];
  location: string;
  photoUri: string | null;
  distance: string;
}

export const api = {
  profile: {
    get: () => request<DJProfile>('/profile'),
    update: (data: Partial<DJProfile>) =>
      request<DJProfile>('/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  tracks: {
    list: () => request<Track[]>('/tracks'),
    detail: (id: string) => request<Track>(`/tracks/${encodeURIComponent(id)}`),
    upload: (data: MixUploadPayload) =>
      request<Track>('/tracks', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<{ success: boolean }>(`/tracks/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
  },

  bookings: {
    list: () => request<Booking[]>('/bookings'),
    detail: (id: string) => request<Booking>(`/bookings/${encodeURIComponent(id)}`),
    accept: (id: string) =>
      request<Booking>(`/bookings/${encodeURIComponent(id)}/accept`, {
        method: 'POST',
      }),
    decline: (id: string) =>
      request<Booking>(`/bookings/${encodeURIComponent(id)}/decline`, {
        method: 'POST',
      }),
  },

  events: {
    list: () => request<Event[]>('/events'),
    detail: (id: string) => request<Event>(`/events/${encodeURIComponent(id)}`),
  },

  analytics: {
    get: () => request<AnalyticsData>('/analytics'),
  },

  availability: {
    list: (month?: string) =>
      request<AvailabilityDate[]>(
        month ? `/availability?month=${encodeURIComponent(month)}` : '/availability',
      ),
    update: (dates: AvailabilityDate[]) =>
      request<{ success: boolean }>('/availability', {
        method: 'PUT',
        body: JSON.stringify({ dates }),
      }),
  },

  epk: {
    get: () =>
      request<{ profile: DJProfile; tracks: Track[]; analytics: AnalyticsData }>('/epk'),
    shareLink: () => request<{ url: string }>('/epk/share-link', { method: 'POST' }),
  },

  collab: {
    nearby: () => request<NearbyDJ[]>('/collab/nearby'),
    request: (data: CollabRequest) =>
      request<{ success: boolean; requestId: string }>('/collab/request', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  mixes: {
    upload: (data: MixUploadPayload) =>
      request<Track>('/mixes/upload', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};

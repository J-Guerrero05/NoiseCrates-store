
export interface SamplePack {
  id: string;
  title: string;
  description: string;
  genre: string;
  bpm: number;
  price: number;
  imageUrl: string;
  previewUrl: string;
  createdAt: string;
  purchasedAt?: string;
}

export type Genre = 'House' | 'Techno' | 'Hip Hop' | 'Trap' | 'Ambient' | 'Pop' | 'Drum & Bass' | 'All';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export interface PurchasedPack {
  id: string;
  user_id: string;
  pack_id: string;
  purchased_at: string;
}

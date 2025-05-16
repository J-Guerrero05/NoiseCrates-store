
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
}

export type Genre = 'House' | 'Techno' | 'Hip Hop' | 'Trap' | 'Ambient' | 'Pop' | 'Drum & Bass' | 'All';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

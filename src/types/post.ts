import type { Comment } from './comment';

export interface Post {
  id: string;
  sender: string;
  title: string;
  mapLink: string;
  price: number;
  numberOfDays: number;
  location: {
    city?: string;
    country: string;
  };
  description: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
  comments?: Comment[];
}

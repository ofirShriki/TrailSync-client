import type { Comment } from './comment';
import type { User } from './user';

export interface Post {
  id: string;
  sender: User;
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

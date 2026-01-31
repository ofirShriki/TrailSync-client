import type { Post } from './post';

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
}

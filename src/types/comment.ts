import type { Post } from './post';
import type { User } from './user';

export interface Comment {
  id: string;
  post: Post['id'];
  user: User['id'];
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

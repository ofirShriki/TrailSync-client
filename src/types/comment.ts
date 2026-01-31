import type { Post } from './post';
import type { User } from './user';

export interface Comment {
  id: string;
  postId: Post['id'];
  userId: User['id'];
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

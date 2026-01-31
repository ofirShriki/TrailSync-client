import axiosInstance from './axiosInstance';
import type { Comment } from '../types/comment';
import type { Post } from '../types/post';

export interface CreateCommentData {
  post: Post['id'];
  text: Comment['text'];
}

export type UpdateCommentData = Pick<Comment, 'text'>;

export const commetService = {
  async getAllComments(): Promise<Comment[]> {
    const response = await axiosInstance.get<Comment[]>('/comment');

    return response.data;
  },

  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await axiosInstance.post<Comment>('/comment', data);

    return response.data;
  },
};

export default commetService;

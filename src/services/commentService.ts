import axiosInstance from './axiosInstance';
import type { Comment } from '../types/comment';

export interface CreateCommentData {
  post: Comment['postId'];
  text: Comment['text'];
}

export type UpdateCommentData = Pick<Comment, 'text'>;

export const commetService = {
  async getAllComments(): Promise<Comment[]> {
    //todo: change it to a constant 'comments' endpoint
    const response = await axiosInstance.get<Comment[]>('/comment');

    return response.data;
  },

  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await axiosInstance.post<Comment>('/comment', data);

    return response.data;
  },
};

export default commetService;

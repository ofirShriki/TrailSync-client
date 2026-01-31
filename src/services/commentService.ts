import axiosInstance from './axiosInstance';
import type { Comment } from '../types/comment';

export interface CreateCommentData {
  postId: Comment['postId'];
  userId: Comment['userId'];
  text: Comment['text'];
}

export type UpdateCommentData = Pick<Comment, 'text'>;

export const commetService = {
  async getAllComments(): Promise<Comment[]> {
    //todo: change it to a constant 'comments' endpoint
    const response = await axiosInstance.get<Comment[]>('/comment');

    return response.data;
  },

  async createPost(data: CreateCommentData): Promise<Comment> {
    const response = await axiosInstance.post<Comment>('/comment', data);

    return response.data;
  },
};

export default commetService;

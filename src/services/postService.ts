import axiosInstance from './axiosInstance';
import type { Post } from '../types/post';

export interface CreatePostData {
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
}

export interface UpdatePostData extends Partial<CreatePostData> {}

export interface GetPostsFilters {
  sender?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minDays?: number;
  maxDays?: number;
}

export interface PaginatedPostsResponse {
  data: Post[];
  hasMore: boolean;
}

export const postService = {
  async getAllPosts(params: {
    filters?: GetPostsFilters;
    page?: number;
    batchSize?: number;
  }): Promise<PaginatedPostsResponse | Post[]> {
    const { filters = {}, page, batchSize } = params;
    const response = await axiosInstance.get<PaginatedPostsResponse>('/post', {
      params: {
        ...filters,
        ...(page &&
          batchSize && {
            page,
            batchSize,
          }),
      },
    });

    return response.data;
  },

  async createPost(formData: FormData): Promise<Post> {
    const response = await axiosInstance.post<Post>('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updatePost(postId: string, formData: FormData): Promise<Post> {
    const response = await axiosInstance.put<Post>(
      `/post/${postId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async deletePost(postId: string): Promise<void> {
    await axiosInstance.delete(`/post/${postId}`);
  },
};

export default postService;

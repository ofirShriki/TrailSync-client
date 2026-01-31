import axiosInstance from "./axiosInstance";
import type { Post } from "../types/post";

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

export const postService = {
	async getAllPosts(filters?: GetPostsFilters): Promise<Post[]> {
		const response = await axiosInstance.get<Post[]>("/post", {
			params: filters,
		});
		return response.data;
	},

	async createPost(formData: FormData): Promise<Post> {
		const response = await axiosInstance.post<Post>("/post", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	},
};

export default postService;

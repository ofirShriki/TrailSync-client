import type { User } from "../types/user";
import axiosInstance from "./axiosInstance";

export interface UpdateUserData {
	username?: string;
	email?: string;
	profilePicture?: File | string;
}

export const userService = {
	async getUserById(userId: string) {
		const response = await axiosInstance.get<User>(`/user/${userId}`);

		return response.data;
	},

	async updateUser(userId: string, data: UpdateUserData) {
		const formData = new FormData();

		if (data.username) formData.append("username", data.username);
		if (data.email) formData.append("email", data.email);
		if (data.profilePicture instanceof File) {
			formData.append("profilePicture", data.profilePicture);
		}

		const response = await axiosInstance.put<User>(
			`/user/${userId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		return response.data;
	},
};

export default userService;

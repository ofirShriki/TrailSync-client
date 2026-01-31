import type { User } from "../types/user";
import axiosInstance from "./axiosInstance";

export const userService = {
	async getUserById(userId: string) {
		const response = await axiosInstance.get<User>(`/user/${userId}`);
		return response.data;
	},
};

export default userService;

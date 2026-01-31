import {
	ACCESS_TOKEN,
	REFRESH_TOKEN,
	USER_ID,
} from "../constants/localStorage";
import axiosInstance from "./axiosInstance";

export interface LoginData {
	email: string;
	password: string;
}

export interface AuthTokens {
	token: string;
	refreshToken: string;
	userId: string;
}

export const authService = {
	async login(data: LoginData): Promise<AuthTokens> {
		const response = await axiosInstance.post<AuthTokens>("/auth/login", data);

		localStorage.setItem(ACCESS_TOKEN, response.data.token);
		localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
		localStorage.setItem(USER_ID, response.data.userId);

		return response.data;
	},
};

export default authService;

import { REFRESH_TOKEN } from "../constants/localStorage";
import axiosInstance from "./axiosInstance";

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
	username: string;
	profilePicture: File | string;
}

export interface AuthTokens {
	token: string;
	refreshToken: string;
}

export interface LoginResponse {
	tokens: AuthTokens;
	userId: string;
}

export const authService = {
	async login(data: LoginData): Promise<LoginResponse> {
		const response = await axiosInstance.post<LoginResponse>(
			"/auth/login",
			data,
		);
		return response.data;
	},

	async register(data: RegisterData): Promise<LoginResponse> {
		const response = await axiosInstance.post<LoginResponse>(
			"/auth/register",
			data,
		);
		return response.data;
	},

	async registerWithFile(data: RegisterData): Promise<LoginResponse> {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("username", data.username);

		if (data.profilePicture instanceof File) {
			formData.append("profilePicture", data.profilePicture);
		}

		const response = await axiosInstance.post<LoginResponse>(
			"/auth/register",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
		return response.data;
	},

	async refreshToken(): Promise<AuthTokens> {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN);

		if (!refreshToken) {
			throw new Error("No refresh token available");
		}

		const response = await axiosInstance.post<AuthTokens>(
			"/auth/refresh-token",
			{
				refreshToken,
			},
		);

		return response.data;
	},
};

export default authService;

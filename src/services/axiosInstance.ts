import axios from "axios";
import { ACCESS_TOKEN, TOKEN_TIMESTAMP } from "../constants/localStorage";

export const isTokenValid = () => {
	const tokenCreateTime = localStorage.getItem(TOKEN_TIMESTAMP);

	if (!tokenCreateTime) {
		return false;
	}

	const timestamp = parseInt(tokenCreateTime, 10);

	if (isNaN(timestamp)) {
		return false;
	}

	const date = new Date(timestamp);
	date.setHours(
		date.getHours() + parseInt(import.meta.env.VITE_TOKEN_EXPIRES_HOURS ?? "3"),
	);

	return date > new Date();
};

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosInstance.interceptors.request.use(async request => {
	request.headers.set(
		"authorization",
		`Bearer ${localStorage.getItem(ACCESS_TOKEN) ?? ""}`,
	);

	return request;
});

export default axiosInstance;

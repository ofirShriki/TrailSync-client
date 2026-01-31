import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// TODO handle tokens and refresh tokens

export default axiosInstance;

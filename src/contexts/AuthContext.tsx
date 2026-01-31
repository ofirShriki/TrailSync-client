import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import {
	ACCESS_TOKEN,
	REFRESH_TOKEN,
	USER_ID,
	TOKEN_TIMESTAMP,
} from "../constants/localStorage";
import { authService } from "../services/authService";
import { isTokenValid } from "../services/axiosInstance";

interface AuthContextType {
	isAuthenticated: boolean;
	userId: string | null;
	isLoading: boolean;
	login: (token: string, refreshToken: string, userId: string) => void;
	logout: () => void;
	refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const checkAuth = async () => {
		setIsLoading(true);
		const token = localStorage.getItem(ACCESS_TOKEN);
		const userId = localStorage.getItem(USER_ID);

		if (!token) {
			setIsAuthenticated(false);
			setUserId(null);
		} else {
			if (isTokenValid()) {
				setIsAuthenticated(true);
				setUserId(userId);
			} else {
				try {
					await refreshAuth();
				} catch (error) {
					console.log("Failed to refresh token:", error);
					logout();
				}
			}
		}
		setIsLoading(false);
	};

	const login = (token: string, refreshToken: string, userId: string) => {
		localStorage.setItem(ACCESS_TOKEN, token);
		localStorage.setItem(REFRESH_TOKEN, refreshToken);
		localStorage.setItem(USER_ID, userId);
		localStorage.setItem(TOKEN_TIMESTAMP, Date.now().toString());
		setIsAuthenticated(true);
		setUserId(userId);
	};

	const logout = () => {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
		localStorage.removeItem(USER_ID);
		localStorage.removeItem(TOKEN_TIMESTAMP);
		setIsAuthenticated(false);
		setUserId(null);
	};

	const refreshAuth = async () => {
		try {
            const tokens = await authService.refreshToken();
            
			localStorage.setItem(ACCESS_TOKEN, tokens.token);
			localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
			localStorage.setItem(TOKEN_TIMESTAMP, Date.now().toString());
			setIsAuthenticated(true);
		} catch (error) {
			logout();
			throw error;
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, userId, isLoading, login, logout, refreshAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../Navbar";
import styles from "./App.styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	ROUTES,
	UNAUTHENTICATED_ROUTES,
	type RouteType,
} from "../../constants/routes";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";

const queryClient = new QueryClient();

const AppRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={styles.root}>
			{isAuthenticated && <Navbar />}
			<Box sx={styles.pageContainer}>
				<Routes>
					{UNAUTHENTICATED_ROUTES.map(
						({ path, element: Component }: RouteType) => (
							<Route key={path} path={path} element={<Component />} />
						),
					)}
					{isAuthenticated ? (
						ROUTES.map(({ path, element: Component }: RouteType) => (
							<Route key={path} path={path} element={<Component />} />
						))
					) : (
						<Route path="*" element={<Navigate to="/" replace />} />
					)}
				</Routes>
			</Box>
		</Box>
	);
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router>
					<AppRoutes />
				</Router>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;

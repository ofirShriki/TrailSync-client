import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../Navbar";
import styles from "./App.styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	ROUTES,
	UNAUTHENTICATED_ROUTES,
	type RouteType,
} from "../../constants/routes";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../constants/localStorage";

const App = () => {
	const queryClient = new QueryClient();
	const [loggedIn, setLoggedIn] = useState(false);

	window.addEventListener("storage", () => {
		setLoggedIn(Boolean(localStorage.getItem(ACCESS_TOKEN)));
	});

	useEffect(() => {
		setLoggedIn(Boolean(localStorage.getItem(ACCESS_TOKEN)));
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Box sx={styles.root}>
					<Routes>
						{UNAUTHENTICATED_ROUTES.map(
							({ path, element: Component }: RouteType) => (
								<Route key={path} path={path} element={<Component />} />
							),
						)}
						{loggedIn && (
							<Box sx={styles.pageContainer}>
								<Navbar />
								{ROUTES.map(({ path, element: Component }: RouteType) => (
									<Route key={path} path={path} element={<Component />} />
								))}
							</Box>
						)}
					</Routes>
				</Box>
			</Router>
		</QueryClientProvider>
	);
};

export default App;

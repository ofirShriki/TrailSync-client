import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../Navbar";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import styles from "./App.styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Box sx={styles.root}>
					<Navbar />
					<Box sx={styles.pageContainer}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</Box>
				</Box>
			</Router>
		</QueryClientProvider>
	);
};

export default App;

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

const App = () => {
	return (
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
	);
};

export default App;

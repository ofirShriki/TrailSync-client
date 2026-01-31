import type React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";

const App: React.FC = () => {
	return (
		<div>
			<Navbar />
			<Home />
		</div>
	);
};

export default App;

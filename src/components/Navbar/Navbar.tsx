import type React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Logo } from "../Icons";
import { Home } from "@mui/icons-material";
import NavbarItem from "./NavbarItem";
import styles from "./Navbar.styles";

const Navbar: React.FC = () => {
	return (
		<Box sx={styles.root}>
			<Box sx={styles.logo}>
				<Logo />
				<Typography variant="h4">TrailSync</Typography>
			</Box>

			<NavbarItem route="/" icon={<Home />} label="Home" />
			<NavbarItem
				route="/profile"
				icon={
					<Avatar
						alt="user name"
						src="/static/images/avatar/2.jpg"
						sx={styles.avatar}
					/>
				}
				label="Profile"
			/>
		</Box>
	);
};

export default Navbar;

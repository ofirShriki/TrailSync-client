import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.styles";

interface NavbarItemProps {
	route: string;
	icon: ReactNode;
	label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ route, icon, label }) => (
	<NavLink to={route} style={{ textDecoration: "none" }}>
		{({ isActive }) => (
			<Button startIcon={icon} sx={styles.item(isActive)}>
				<Typography>{label}</Typography>
			</Button>
		)}
	</NavLink>
);

export default NavbarItem;

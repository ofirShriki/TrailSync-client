import type React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Logo } from "../Icons";
import { Home } from "@mui/icons-material";
import NavbarItem from "./NavbarItem";
import styles from "./Navbar.styles";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";

const Navbar: React.FC = () => {
	const { userId } = useAuth();

	const { data: user } = useQuery({
		queryKey: [QUERY_KEYS.USER_BY_ID],
		enabled: !!userId,
		queryFn: () => userService.getUserById(userId!),
	});

	return (
		<Box sx={styles.root}>
			<Box sx={styles.logo}>
				<Logo />
				<Typography variant="h4">TrailSync</Typography>
			</Box>

			<NavbarItem route="/home" icon={<Home />} label="Home" />
			<NavbarItem
				route="/profile"
				icon={
					<Avatar
						alt="user name"
						src={
							user &&
							`${import.meta.env.VITE_SERVER_URL}/${user.profilePicture}`
						}
						sx={styles.avatar}
					/>
				}
				label="Profile"
			/>
		</Box>
	);
};

export default Navbar;

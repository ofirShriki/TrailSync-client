import type React from "react";
import Box from "@mui/material/Box";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import PostList from "../../components/PostList";
import { users } from "../../constants/staticInfo";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import EditProfileModal from "../../components/EditProfileModal";
import styles from "./Profile.styles";

const Profile: React.FC = () => {
	const user = users[0];
	const { username, profilePicture, posts } = user;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	return (
		<Box>
			<Box sx={styles.header}>
				<Avatar src={profilePicture} alt={username} sx={styles.avatar} />
				<Box>
					<Box sx={styles.usernameContainer}>
						<Typography variant="h5" fontWeight={500}>
							{username}
						</Typography>

						<IconButton
							color="primary"
							onClick={() => setIsEditModalOpen(true)}
						>
							<Edit />
						</IconButton>
					</Box>

					<Typography variant="body1" sx={styles.postsTitle}>
						<strong>{posts?.length}</strong> posts
					</Typography>
				</Box>
			</Box>
			<Divider sx={styles.divider} />
			{posts && <PostList posts={posts} />}
			<EditProfileModal
				isModalOpen={isEditModalOpen}
				setIsModalOpen={setIsEditModalOpen}
				user={user}
			/>
		</Box>
	);
};

export default Profile;

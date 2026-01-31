import type React from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, IconButton, Typography } from "@mui/material";
import PostList from "../../components/PostList";
import { Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import EditProfileModal from "../../components/EditProfileModal";
import CreatePostModal from "../../components/CreatePostModal";
import styles from "./Profile.styles";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";
import postService from "../../services/postService";

const Profile: React.FC = () => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const { userId } = useAuth();

	const { data: user } = useQuery({
		queryKey: [QUERY_KEYS.USER_BY_ID],
		enabled: !!userId,
		queryFn: () => userService.getUserById(userId!),
	});

	const { data: posts } = useQuery({
		queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
		enabled: !!userId,
		queryFn: () => postService.getAllPosts({ sender: userId! }),
	});

	return (
		user && (
			<Box>
				<Box sx={styles.header}>
					<Box sx={styles.headerInfo}>
						<Avatar
							src={`${import.meta.env.VITE_SERVER_URL}/${user?.profilePicture}`}
							alt={user?.username}
							sx={styles.avatar}
						/>
						<Box>
							<Box sx={styles.usernameContainer}>
								<Typography variant="h5" fontWeight={500}>
									{user?.username}
								</Typography>

								<Box sx={{ display: "flex", gap: 1 }}>
									<IconButton
										color="primary"
										onClick={() => setIsEditModalOpen(true)}
									>
										<Edit />
									</IconButton>
								</Box>
							</Box>

							<Typography variant="body1" sx={styles.postsTitle}>
								<strong>{posts?.length}</strong> posts
							</Typography>
						</Box>
					</Box>
					<Button
						variant="contained"
						sx={styles.addButton}
						color="primary"
						startIcon={<Add />}
						onClick={() => setIsCreateModalOpen(true)}
					>
						Share new trail
					</Button>
				</Box>
				<Divider sx={styles.divider} />
				{posts && <PostList posts={posts} />}
				<EditProfileModal
					isModalOpen={isEditModalOpen}
					setIsModalOpen={setIsEditModalOpen}
					user={user}
				/>
				<CreatePostModal
					isModalOpen={isCreateModalOpen}
					setIsModalOpen={setIsCreateModalOpen}
				/>
			</Box>
		)
	);
};

export default Profile;

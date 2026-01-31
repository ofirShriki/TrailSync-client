import type React from "react";
import { useEffect, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostList from "../../components/PostList";
import styles from "./Home.styles";
import CreatePostModal from "../../components/CreatePostModal";
import { postService } from "../../services/postService";
import type { Post } from "../../types/post";

const Home: React.FC = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		(async () => {
			const fetchPosts = await postService.getAllPosts();
			setPosts(fetchPosts);
		})().catch(err => {
			console.error("Error fetching posts:", err);
		});
	}, []);

	const handleCreatePost = () => {
		setIsCreateModalOpen(true);
	};

	return (
		<Box sx={styles.root}>
			<PostList posts={[...posts]} />
			<Fab
				color="primary"
				onClick={handleCreatePost}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				variant={isHovered ? "extended" : "circular"}
				sx={styles.createButton}
			>
				<AddIcon />
				{isHovered && (
					<Typography variant="button">Share your trail </Typography>
				)}
			</Fab>
			{isCreateModalOpen && (
				<CreatePostModal
					isModalOpen={isCreateModalOpen}
					setIsModalOpen={setIsCreateModalOpen}
				/>
			)}
		</Box>
	);
};

export default Home;

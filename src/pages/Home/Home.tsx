import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import CreatePostModal from "../../components/CreatePostModal";
import PostList from "../../components/PostList";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { postService } from "../../services/postService";
import type { Post } from "../../types/post";
import styles from "./Home.styles";

const Home: React.FC = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const {
		data: posts = [],
		isLoading,
		refetch,
	} = useQuery<Post[]>({
		queryKey: [QUERY_KEYS.POSTS],
		queryFn: async () => await postService.getAllPosts(),
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	const handleCreatePost = () => {
		setIsCreateModalOpen(true);
	};

	return (
		<Box sx={styles.root}>
			<PostList posts={posts} isLoading={isLoading} />
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
					refetchPosts={refetch}
				/>
			)}
		</Box>
	);
};

export default Home;

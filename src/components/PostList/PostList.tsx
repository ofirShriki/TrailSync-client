import React, { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import PostCard from "../PostCard";
import type { Post } from "../../types/post";
import PostModal from "../PostModal";
import styles from "./PostList.styles";

interface PostListProps {
	posts: Post[];
	isLoading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading = false }) => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const handleCardClick = (post: Post) => {
		setSelectedPost(post);
		setIsPostModalOpen(true);
	};

	return (
		<Box sx={styles.root}>
			{isLoading
				? Array.from({ length: 3 }).map((_, index) => (
						<Skeleton key={index} sx={styles.skeleton} />
					))
				: posts.map((post: Post) => (
						<PostCard
							key={post.id}
							post={post}
							onCardClick={() => handleCardClick(post)}
						/>
					))}

			{selectedPost && (
				<PostModal
					isModalOpen={isPostModalOpen}
					setIsModalOpen={setIsPostModalOpen}
					post={selectedPost}
				/>
			)}
		</Box>
	);
};

export default PostList;

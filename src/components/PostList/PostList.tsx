import React, { useState } from "react";
import { Box } from "@mui/material";
import PostCard from "../PostCard";
import type { Post } from "../../types/post";
import PostModal from "../PostModal";
import styles from "./PostList.styles";

interface PostListProps {
	posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const handleCardClick = (post: Post) => {
		setSelectedPost(post);
		setIsPostModalOpen(true);
	};

	return (
		<Box sx={styles.root}>
			{posts.map((post: Post) => (
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

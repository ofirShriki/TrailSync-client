import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Post } from "../../types/post";
import ImageCarousel from "../ImageCarousel";
import LogisticsSection from "./Logistics/LogisticsSection";
import style from "./PostModal.styles.ts";
import GenericModal from "../GenericModal";

interface PostModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	post: Post;
}

const PostModal: React.FC<PostModalProps> = ({
	isModalOpen,
	setIsModalOpen,
	post,
}) => {
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<Box sx={style.header}>
				<IconButton onClick={handleCloseModal} size="small">
					<ArrowBackIcon />
				</IconButton>
				<Typography variant="h5">{post.title}</Typography>
			</Box>

			<Box sx={style.content}>
				<Box sx={style.column}>
					<iframe
						style={style.iframe}
						src={post.mapLink}
						allowFullScreen
						loading="lazy"
					/>
					<ImageCarousel photos={post.photos} alt={post.title} />
				</Box>

				<Box sx={style.column}>
					<Box sx={style.description}>
						<Typography variant="h6" sx={style.title}>
							Description
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{post.description}
						</Typography>
					</Box>

					<LogisticsSection
						region={`${post.location.city ? `${post.location.city}, ` : ""}${post.location.country}`}
						numberOfDays={post.numberOfDays}
						price={post.price}
					/>
				</Box>
			</Box>
		</GenericModal>
	);
};

export default PostModal;

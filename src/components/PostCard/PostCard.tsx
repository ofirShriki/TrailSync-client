import type React from "react";
import PostMetadata from "./PostMetadata";
import type { Post } from "../../types/post";
import { GoogleMaps } from "../Icons/";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Box,
	Divider,
	IconButton,
} from "@mui/material";
import styles from "./PostCard.styles";

interface PostProperties {
	post: Post;
	onCardClick?: () => void;
}

const PostCard: React.FC<PostProperties> = ({ post, onCardClick }) => {
	const firstPhoto = post.photos[0];

	return (
		<Card onClick={onCardClick} sx={styles.root}>
			<Box sx={styles.cardContentContainer}>
				<CardContent sx={styles.cardContent}>
					<Typography variant="h6" sx={styles.postTitle}>
						{post.title}
					</Typography>

					<PostMetadata
						location={post.location}
						numberOfDays={post.numberOfDays}
						price={post.price}
					/>

					<Typography variant="body1" sx={styles.postDescription}>
						{post.description}
					</Typography>
				</CardContent>

				<CardMedia
					component="img"
					image={firstPhoto}
					alt={post.title}
					sx={styles.media}
				/>
			</Box>

			<Divider />

			<CardActions sx={styles.actions}>
				<Box sx={styles.comments}>
					<ChatBubbleOutlineIcon fontSize="small" color="primary" />
					<Typography variant="body2" color="text.secondary">
						{post.comments?.length ?? 0}
					</Typography>
				</Box>

				<IconButton
					component="a"
					href={post.mapLink}
					onClick={e => e.stopPropagation()}
					size="small"
				>
					<Box component={GoogleMaps} />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default PostCard;

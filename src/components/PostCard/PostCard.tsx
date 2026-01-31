import type React from 'react';
import PostMetadata from './PostMetadata';
import type { Post } from '../../types/post';
import { GoogleMaps } from '../Icons/';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import styles from './PostCard.styles';
import { useState } from 'react';
import CommentList from '../CommentList';
import AddComment from '../AddComment';

interface PostProperties {
  post: Post;
  onCardClick?: () => void;
}

const PostCard: React.FC<PostProperties> = ({ post, onCardClick }) => {
  const firstPhoto = post.photos[0];
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments ?? []);

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
          image={`${import.meta.env.VITE_SERVER_URL}/${firstPhoto}`}
          alt={post.title}
          sx={styles.media}
        />
      </Box>

      <Divider />

      <CardActions sx={styles.actions}>
        <Box sx={styles.comments}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowComments((s) => !s);
            }}
          >
            <ChatBubbleOutlineIcon fontSize="small" color="primary" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {comments.length}
          </Typography>
        </Box>

        <IconButton
          component="a"
          href={post.mapLink}
          onClick={(e) => e.stopPropagation()}
          size="small"
        >
          <Box component={GoogleMaps} />
        </IconButton>
      </CardActions>

      {showComments && (
        <Box sx={{ padding: 2 }} onClick={(e) => e.stopPropagation()}>
          <CommentList comments={comments} />
          <AddComment
            postId={post.id}
            onAddComment={(newComment) => {
              setComments((prev) => [...prev, newComment]);
            }}
          />
        </Box>
      )}
    </Card>
  );
};

export default PostCard;

import type React from 'react';
import PostMetadata from './PostMetadata';
import type { Post } from '../../types/post';
import GoogleMaps from '../Icons/GoogleMaps/GoogleMaps';
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

interface PostProperties {
  post: Post;
  onCardClick?: () => void;
}

const PostCard: React.FC<PostProperties> = ({ post, onCardClick }: PostProperties) => {
  const firstPhoto = post.photos[0];

  return (
    <Card sx={{ width: '100%', borderRadius: 3, cursor: 'pointer' }} onClick={onCardClick}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height="180" image={firstPhoto} alt={post.title} />
      </Box>
      <CardContent>
        <Typography variant="h6" component="div">
          {post.title}
        </Typography>
        <PostMetadata
          location={post.location}
          numberOfDays={post.numberOfDays}
          price={post.price}
        />
      </CardContent>
      <Divider orientation="horizontal" />
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ChatBubbleOutlineIcon sx={{ width: 20, height: 20 }} color="action" />
          <Typography variant="body2">{post.comments?.length ?? 0}</Typography>
        </Box>
        <Box>
          <IconButton component="a" href={post.mapLink}>
            <Box component={GoogleMaps} />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;

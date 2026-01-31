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

const PostCard: React.FC<PostProperties> = ({ post, onCardClick }) => {
  const firstPhoto = post.photos[0];

  return (
    <Card
      onClick={onCardClick}
      sx={{
        width: '100%',
        cursor: 'pointer',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ display: 'flex', minHeight: 160 }}>
        <Box sx={{ flex: 1, p: 1 }}>
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </Typography>

            <PostMetadata
              location={post.location}
              numberOfDays={post.numberOfDays}
              price={post.price}
            />

            <Typography
              variant="body1"
              sx={{
                mt: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {post.description}
            </Typography>
          </CardContent>
        </Box>

        <CardMedia
          component="img"
          image={firstPhoto}
          alt={post.title}
          sx={{
            width: 160,
            p: 1,
            borderRadius: 3,
            objectFit: 'cover',
          }}
        />
      </Box>

      <Divider />

      <CardActions
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ChatBubbleOutlineIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {post.comments?.length ?? 0}
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
    </Card>
  );
};

export default PostCard;

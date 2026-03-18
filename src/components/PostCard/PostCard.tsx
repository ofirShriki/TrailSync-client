import type React from 'react';
import PostMetadata from './PostMetadata';
import type { Post } from '../../types/post';
import { GoogleMaps } from '../Icons/';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import styles from './PostCard.styles';
import { useState } from 'react';
import CommentList from '../CommentList';
import AddComment from '../AddComment';
import { getProfilePicturePath } from '../../utils/userUtils';
import { useAuth } from '../../contexts/AuthContext';
import UpdatePostModal from '../UpdatePostModal';
import DeletePostButton from '../DeletePostButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import postService from '../../services/postService';

interface PostProperties {
  post: Post;
  onCardClick?: () => void;
}

const PostCard: React.FC<PostProperties> = ({ post, onCardClick }) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const firstPhoto = post.photos[0];
  const [showComments, setShowComments] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const isPostCurrUserPost = userId === post.sender?.id;
  const isLiked = !!userId && (post.likes ?? []).includes(userId);
  const likeCount = post.likes?.length ?? 0;

  const updateLikesInCache = (postId: string, updatedLikes: string[]) => {
    const updatePosts = (oldPosts: Post[] | undefined) =>
      oldPosts?.map(post =>
        post.id === postId ? { ...post, likes: updatedLikes } : post
      );

    queryClient.setQueriesData(
      { queryKey: [QUERY_KEYS.POSTS] },
      (
        oldData:
          | {
              pages: { data: Post[]; hasMore: boolean }[];
              pageParams: number[];
            }
          | undefined
      ) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: updatePosts(page.data) ?? page.data,
          })),
        };
      }
    );

    queryClient.setQueriesData(
      { queryKey: [QUERY_KEYS.POSTS_BY_USER] },
      updatePosts
    );
  };

  const { mutate: toggleLike } = useMutation({
    mutationFn: (wasLiked: boolean) =>
      wasLiked
        ? postService.unlikePost(post.id)
        : postService.likePost(post.id),
    onMutate: (wasLiked: boolean) => {
      const previousLikes = post.likes ?? [];
      const updatedLikes = wasLiked
        ? previousLikes.filter(id => id !== userId)
        : [...previousLikes, userId!];
      updateLikesInCache(post.id, updatedLikes);

      return { previousLikes };
    },
    onError: (_err, _wasLiked, context) => {
      updateLikesInCache(post.id, context?.previousLikes ?? []);
    },
  });

  return (
    <Card sx={styles.root}>
      <Box onClick={onCardClick} sx={styles.cardContentContainer}>
        <CardContent sx={styles.cardContent}>
          <Box sx={styles.authorRow}>
            <Avatar
              src={getProfilePicturePath(post.sender?.profilePicture)}
              sx={styles.authorAvatar}
            />
            <Box>
              <Typography variant="subtitle2" sx={styles.authorName}>
                {post.sender?.username ?? 'Unknown'}
              </Typography>
            </Box>
          </Box>

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

      <CardActions sx={styles.actions} onClick={e => e.stopPropagation()}>
        <Box sx={styles.leftActions}>
          <IconButton
            size="small"
            onClick={() => {
              setShowComments(showComments => !showComments);
            }}
          >
            <ChatBubbleOutlineIcon fontSize="small" color="primary" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.comments?.length}
          </Typography>

          <IconButton size="small" onClick={() => toggleLike(isLiked)}>
            {isLiked ? (
              <FavoriteIcon fontSize="small" sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteBorderIcon fontSize="small" color="primary" />
            )}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likeCount}
          </Typography>

          {isPostCurrUserPost && (
            <IconButton
              size="small"
              onClick={() => {
                setIsUpdateModalOpen(true);
              }}
              title="Edit post"
            >
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
          )}
        </Box>

        <Box>
          {isPostCurrUserPost && (
            <DeletePostButton postId={post.id} userId={post.sender?.id} />
          )}
          <IconButton
            component="a"
            href={post.mapLink}
            onClick={e => e.stopPropagation()}
            size="small"
          >
            <Box component={GoogleMaps} />
          </IconButton>
        </Box>
      </CardActions>

      {showComments && (
        <Box sx={{ padding: 2 }}>
          {post.comments && <CommentList comments={post.comments} />}
          <AddComment postId={post.id} />
        </Box>
      )}

      {isUpdateModalOpen && (
        <UpdatePostModal
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          post={post}
        />
      )}
    </Card>
  );
};

export default PostCard;

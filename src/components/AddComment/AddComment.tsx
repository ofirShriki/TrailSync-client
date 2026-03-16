import React, { useState } from 'react';
import { Box, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './AddComment.styles';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import userService from '../../services/userService';
import commetService, {
  type CreateCommentData,
} from '../../services/commentService';
import type { Comment } from '../../types/comment';
import { getProfilePicturePath } from '../../utils/userUtils';
import type { Post } from '../../types/post';

type Props = {
  postId: string;
  onAddComment?: (comment: Comment) => void;
};

const AddComment: React.FC<Props> = ({ postId, onAddComment }) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState('');

  const { data: currentUser } = useQuery({
    queryKey: [QUERY_KEYS.USER_BY_ID, userId],
    queryFn: () =>
      userId ? userService.getUserById(userId) : Promise.reject('No user ID'),
    enabled: !!userId,
  });

  const { mutate: createComment, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateCommentData) => commetService.createComment(data),
    onSuccess: newComment => {
      onAddComment?.(newComment);

      const updatePosts = (
        oldData:
          | {
              pages: {
                data: Post[];
                hasMore: boolean;
              }[];
              pageParams: number[];
            }
          | undefined
      ) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: page.data.map(post =>
              post.id === newComment.post
                ? {
                    ...post,
                    comments: [...(post.comments ?? []), newComment],
                  }
                : post
            ),
          })),
        };
      };

      queryClient.setQueriesData({ queryKey: [QUERY_KEYS.POSTS] }, updatePosts);

      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.POSTS_BY_USER] },
        updatePosts
      );
    },
  });

  if (!currentUser) {
    return null;
  }

  const handleSend = () => {
    const trimmedText = text.trim();

    if (trimmedText) {
      createComment({ post: postId, text: trimmedText });

      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={styles.root}>
      <Avatar src={getProfilePicturePath(currentUser.profilePicture)} />
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={10}
        placeholder="Write a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="outlined"
        size="small"
        sx={styles.input}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={!text.trim() || isLoading}
        sx={styles.button}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default AddComment;

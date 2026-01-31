import React, { useState } from 'react';
import { Box, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './AddComment.styles';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import userService from '../../services/userService';
import commetService, { type CreateCommentData } from '../../services/commentService';
import type { Comment } from '../../types/comment';

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
    queryFn: () => (userId ? userService.getUserById(userId) : Promise.reject('No user ID')),
    enabled: !!userId,
  });

  const { mutate: createComment, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateCommentData) => commetService.createComment(data),
    onSuccess: (newComment) => {
      onAddComment?.(newComment);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
      });
    },
  });

  if (!currentUser) {
    return null;
  }

  const handleSend = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    createComment({ post: postId, text: trimmedText });

    setText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const userProfilePicture = currentUser.profilePicture
    ? `${import.meta.env.VITE_SERVER_URL}/${currentUser.profilePicture}`
    : undefined;

  return (
    <Box sx={styles.root}>
      <Avatar src={userProfilePicture ?? '/avatars/default.png'} />
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={10}
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
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

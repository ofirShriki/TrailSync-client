import React, { useState } from 'react';
import { Box, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import type { Comment } from '../../types/comment';
import styles from './AddComment.styles';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import userService from '../../services/userService';

type Props = {
  postId: string;
  onAddComment: (comment: Comment) => void;
};

const AddComment: React.FC<Props> = ({ postId, onAddComment }) => {
  const [text, setText] = useState('');

  const { userId } = useAuth();

  const { data: currentUser } = useQuery({
    queryKey: [QUERY_KEYS.USER_BY_ID, userId],
    queryFn: () => (userId ? userService.getUserById(userId) : Promise.reject('No user ID')),
    enabled: !!userId,
  });

  if (!currentUser) {
    return null;
  }

  const handleSend = () => {
    if (text.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        postId,
        userId: currentUser.id,
        text: text.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddComment(newComment);
      setText('');
    }
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
      <IconButton color="primary" onClick={handleSend} disabled={!text.trim()} sx={styles.button}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default AddComment;

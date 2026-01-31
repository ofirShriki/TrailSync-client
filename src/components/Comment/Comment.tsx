import type React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import styles from './Comment.styles';
import type { Comment } from '../../types/comment';
import { useQuery } from '@tanstack/react-query';
import userService from '../../services/userService';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { getProfilePicturePath } from '../../utils/userUtils';

type CommentProps = {
  comment: Comment;
};

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  const { data: commentWriter } = useQuery({
    queryKey: [QUERY_KEYS.USER_BY_ID, comment.user],
    queryFn: () => userService.getUserById(comment.user),
  });

  if (!commentWriter) {
    return null;
  }

  const displayName = commentWriter.username;

  const timeSincePublish = (() => {
    const MS_IN_SECOND = 1000;

    const timeDifference = Date.now() - new Date(comment.createdAt).getTime();

    const days = Math.floor(timeDifference / (MS_IN_SECOND * 60 * 60 * 24));
    if (days >= 1) return `${days}d`;

    const hours = Math.floor(timeDifference / (MS_IN_SECOND * 60 * 60));
    if (hours >= 1) return `${hours}h`;

    const minutes = Math.floor(timeDifference / (MS_IN_SECOND * 60));
    return `${minutes}m`;
  })();

  return (
    <Box sx={styles.root}>
      <Avatar src={getProfilePicturePath(commentWriter.profilePicture)} />
      <Box sx={styles.body}>
        <Box sx={styles.header}>
          <Typography component="span" sx={styles.username}>
            {displayName}
          </Typography>
          <Typography component="span" sx={styles.time}>
            {timeSincePublish}
          </Typography>
        </Box>

        <Box sx={styles.bubble}>
          <Typography sx={styles.text}>{comment.text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentComponent;

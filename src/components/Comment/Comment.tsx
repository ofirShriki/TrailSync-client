import { Box, Avatar, Typography } from '@mui/material';
import styles from './Comment.styles';
import type { Comment } from '../../types/comment';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import userService from '../../services/userService';

type CommentProps = {
  comment: Comment;
};

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  //todo: add populate user in get comments on server
  //   const { data: commentWriter } = useQuery({
  //     queryKey: [QUERY_KEYS.USER_BY_ID, comment.userId],
  //     queryFn: () => userService.getUserById(comment.userId),
  //   });

  //   if (!commentWriter) {
  //     return null;
  //   }

  const commentWriter = {
    id: comment.userId,
    username: 'User',
    profilePicture: undefined,
  };

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

  //todo: put in util
  const profileSrc = commentWriter.profilePicture
    ? `${import.meta.env.VITE_SERVER_URL}/${commentWriter.profilePicture}`
    : undefined;

  return (
    <Box sx={styles.root}>
      <Avatar src={profileSrc ?? '/avatars/default.png'} />
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

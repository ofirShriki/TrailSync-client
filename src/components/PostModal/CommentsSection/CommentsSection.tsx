import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Post } from '../../../types/post';
import CommentList from '../../CommentList';
import AddComment from '../../AddComment';
import styles from './CommentsSection.styles';

type Props = {
  post: Post;
};

const CommentsSection: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = React.useState(post.comments ?? []);

  React.useEffect(() => {
    setComments(post.comments ?? []);
  }, [post.comments]);

  return (
    <Box sx={styles.root}>
      <Typography variant="h6" sx={styles.title}>
        Comment Section
      </Typography>

      <Box sx={styles.list}>
        <CommentList comments={comments} />
      </Box>

      <AddComment
        postId={post.id}
        onAddComment={(comment) => setComments((p) => [...p, comment])}
      />
    </Box>
  );
};

export default CommentsSection;

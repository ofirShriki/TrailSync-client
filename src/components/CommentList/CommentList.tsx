import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Comment as CommentType } from '../../types/comment';
import Comment from '../Comment';

type Props = {
  comments?: CommentType[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Box>
        <Typography color="text.secondary">No comments yet</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};

export default CommentList;

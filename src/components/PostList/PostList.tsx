import React from 'react';
import { Box } from '@mui/material';
import PostCard from '../PostCard/PostCard';
import { posts } from '../../constants/staticInfo';
import type { Post } from '../../types/post';

const PostList: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 2,
        p: 2,
      }}
    >
      {[...posts, ...posts].map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default PostList;

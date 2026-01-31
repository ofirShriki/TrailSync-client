import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PostCard from '../PostCard/PostCard';
import { posts } from '../../constants/staticInfo';
import type { Post } from '../../types/post';
import PostModal from '../PostModal/PostModal';

const PostList: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    console.log(isPostModalOpen);
  }, [isPostModalOpen]);

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

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
        <PostCard key={post.id} post={post} onCardClick={() => handleCardClick(post)} />
      ))}

      {selectedPost && (
        <PostModal
          isModalOpen={isPostModalOpen}
          setIsModalOpen={setIsPostModalOpen}
          post={selectedPost}
        />
      )}
    </Box>
  );
};

export default PostList;

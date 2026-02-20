import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';
import PostCard from '../PostCard';
import type { Post } from '../../types/post';
import PostModal from '../PostModal';
import styles from './PostList.styles';

interface PostListProps {
  posts: Post[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isFetchingMore?: boolean;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading = false,
  onLoadMore,
  hasMore = false,
  isFetchingMore = false,
}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([post]) => {
        if (post.isIntersecting && hasMore && !isFetchingMore) {
          onLoadMore?.();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isFetchingMore, onLoadMore]);

  return (
    <Box sx={styles.root}>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} sx={styles.skeleton} />
          ))
        : posts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              onCardClick={() => handleCardClick(post)}
            />
          ))}

      {!isLoading && hasMore && (
        <Box ref={observerTarget}>
          {isFetchingMore && <Skeleton sx={styles.skeleton} />}
        </Box>
      )}

      {selectedPost && (
        <PostModal
          isModalOpen={selectedPost != null}
          setIsModalOpen={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
    </Box>
  );
};

export default PostList;

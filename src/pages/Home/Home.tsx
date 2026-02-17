import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import type React from "react";
import { useMemo, useState } from "react";
import CreatePostModal from "../../components/CreatePostModal";
import PostList from "../../components/PostList";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { postService } from "../../services/postService";
import styles from "./Home.styles";

const Home: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.POSTS],
      queryFn: async ({ pageParam = 1 }) =>
        await postService.getAllPosts({
          page: pageParam,
          batchSize: Number(import.meta.env.VITE_BATCH_SIZE),
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore ? allPages.length + 1 : undefined,
      initialPageParam: 1,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  const posts = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data]
  );

  const handleCreatePost = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <Box sx={styles.root}>
      <PostList
        posts={posts}
        isLoading={isLoading}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isFetchingMore={isFetchingNextPage}
      />
      <Fab
        color="primary"
        onClick={handleCreatePost}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant={isHovered ? "extended" : "circular"}
        sx={styles.createButton}
      >
        <AddIcon />
        {isHovered && (
          <Typography variant="button">Share your trail </Typography>
        )}
      </Fab>
      {isCreateModalOpen && (
        <CreatePostModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
        />
      )}
    </Box>
  );
};

export default Home;

import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import type React from "react";
import { useMemo, useState } from "react";
import CreatePostModal from "../../components/CreatePostModal";
import PostList from "../../components/PostList";
import FiltersBar, { type FiltersState } from "../../components/FiltersBar";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { postService } from "../../services/postService";
import styles from "./Home.styles";

const Home: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FiltersState>({});

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.POSTS, appliedFilters],
      queryFn: async ({ pageParam = 1 }) => {
        const filters: any = {};

        if (appliedFilters.minDays) filters.minDays = appliedFilters.minDays;
        if (appliedFilters.maxDays) filters.maxDays = appliedFilters.maxDays;
        if (appliedFilters.maxPrice) filters.maxPrice = appliedFilters.maxPrice;
        if (appliedFilters.country) filters.country = appliedFilters.country;
        if (appliedFilters.city) filters.city = appliedFilters.city;
        return await postService.getAllPosts({
          filters,
          page: pageParam,
          batchSize: Number(import.meta.env.VITE_BATCH_SIZE),
        });
      },
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

  const handleApplyFilters = (filters: FiltersState) => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.filtersContainer}>
        <FiltersBar
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </Box>

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

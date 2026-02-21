import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Fab, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pickBy, identity } from 'lodash';
import type React from 'react';
import { useMemo, useState } from 'react';
import CreatePostModal from '../../components/CreatePostModal';
import PostList from '../../components/PostList';
import FiltersBar, { type FiltersState } from '../../components/FiltersBar';
import { QUERY_KEYS } from '../../constants/queryKeys';
import {
  postService,
  type PaginatedPostsResponse,
} from '../../services/postService';
import styles from './Home.styles';

const Home: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FiltersState>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS, appliedFilters],
    queryFn: async ({ pageParam = 1 }) => {
      if (searchQuery) {
        const results = await postService.searchPosts({ query: searchQuery });

        return { data: results, hasMore: false };
      }

      const filters = pickBy(appliedFilters, identity);

      return (await postService.getAllPosts({
        filters,
        page: pageParam,
        batchSize: Number(import.meta.env.VITE_BATCH_SIZE),
      })) as PaginatedPostsResponse;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
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
      <Box sx={styles.searchContainer}>
        <Box sx={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Ai generated search - describe you next travel, with your own words..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') refetch();
            }}
            style={styles.searchInput}
          />
          <Box sx={styles.searchIconWrapper} onClick={() => refetch()}>
            <SearchIcon />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.filtersContainer}>
        <FiltersBar
          onApplyFilters={filters => setAppliedFilters(filters)}
          onClearFilters={() => setAppliedFilters({})}
        />
      </Box>

      <PostList
        posts={posts}
        isLoading={isLoading || isFetching}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isFetchingMore={isFetchingNextPage}
      />
      <Fab
        color="primary"
        onClick={handleCreatePost}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant={isHovered ? 'extended' : 'circular'}
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

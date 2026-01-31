import type React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Button, Divider, IconButton, Skeleton, Typography } from '@mui/material';
import PostList from '../../components/PostList';
import { Add, Edit } from '@mui/icons-material';
import { useState } from 'react';
import EditProfileModal from '../../components/EditProfileModal';
import CreatePostModal from '../../components/CreatePostModal';
import styles from './Profile.styles';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import userService from '../../services/userService';
import postService from '../../services/postService';

const Profile: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [imageRefreshKey, setImageRefreshKey] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: [QUERY_KEYS.USER_BY_ID, userId],
    enabled: !!userId,
    queryFn: () => userService.getUserById(userId!),
  });

  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
    enabled: !!userId,
    queryFn: () => postService.getAllPosts({ sender: userId! }),
  });

  const handleRefetchProfile = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_BY_ID, userId] });
    setImageLoading(true);
    setImageRefreshKey(Date.now().toString());
  };

  return (
    user && (
      <Box>
        <Box sx={styles.header}>
          <Box sx={styles.headerInfo}>
            {imageLoading && (
              <Skeleton variant="circular" width={100} height={100} sx={styles.avatar} />
            )}
            <Avatar
              src={`${import.meta.env.VITE_SERVER_URL}/${user?.profilePicture}${imageRefreshKey ? `?t=${imageRefreshKey}` : ''}`}
              alt={user?.username}
              sx={{ ...styles.avatar, display: imageLoading ? 'none' : 'flex' }}
              onLoad={() => setImageLoading(false)}
            />
            <Box>
              <Box sx={styles.usernameContainer}>
                <Typography variant="h5" fontWeight={500}>
                  {user?.username}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton color="primary" onClick={() => setIsEditModalOpen(true)}>
                    <Edit />
                  </IconButton>
                </Box>
              </Box>

              <Typography variant="body1" sx={styles.postsTitle}>
                <strong>{posts?.length}</strong> posts
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={styles.addButton}
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Share new trail
          </Button>
        </Box>
        <Divider sx={styles.divider} />

        {posts && <PostList posts={posts} />}

        <EditProfileModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          user={user}
          onSuccess={handleRefetchProfile}
        />
        <CreatePostModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />
      </Box>
    )
  );
};
export default Profile;

import type React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Divider, IconButton, Typography } from '@mui/material';
import PostList from '../PostList/PostList';
import { users } from '../../constants/staticInfo';
import { Edit } from '@mui/icons-material';

const Profile: React.FC = () => {
  const { username, profilePicture, posts } = users[0];

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          alignItems: 'flex-start',
          p: 2,
        }}
      >
        <Avatar src={profilePicture} alt={username} sx={{ width: 100, height: 100 }} />
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              mt: 0.5,
            }}
          >
            <Typography variant="h5" fontWeight={500}>
              {username}
            </Typography>

            <IconButton color="primary">
              <Edit />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ mb: 1, gap: 0.5 }}>
            <strong>{posts?.length}</strong> posts
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      {posts && <PostList posts={posts} />}
    </Box>
  );
};

export default Profile;

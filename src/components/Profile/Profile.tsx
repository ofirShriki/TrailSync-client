import type React from 'react';
import Box from '@mui/material/Box';

const Profile: React.FC = () => {
  return (
    <Box
      sx={{
        width: 190,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (theme) => theme.palette.neutral.light,
        p: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        overflow: 'none',
      }}
    ></Box>
  );
};

export default Profile;

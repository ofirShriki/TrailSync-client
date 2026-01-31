import type React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logo from '../Icons/Logo/Logo';

const Navbar: React.FC = () => {
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
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Box component={Logo} sx={{ mr: 1 }} />
        <Typography variant="h4">TrailSync</Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          p: 1,
        }}
      >
        <Avatar alt="user name" src="/static/images/avatar/2.jpg" />
        <Typography>Profile</Typography>
      </IconButton>
    </Box>
  );
};

export default Navbar;

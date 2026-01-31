import type React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logo from '../Icons/Logo/Logo';
import { Home } from '@mui/icons-material';

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
        overflow: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box component={Logo} sx={{ mr: 1 }} />
        <Typography variant="h4">TrailSync</Typography>
      </Box>

      <IconButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          p: 1,
          borderRadius: 1,
          mb: 4, // spacing below the button
        }}
      >
        <Home />
        <Typography>Home</Typography>
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          p: 1,
          borderRadius: 1,
        }}
      >
        <Avatar alt="user name" src="/static/images/avatar/2.jpg" />
        <Typography>Profile</Typography>
      </IconButton>
    </Box>
  );
};

export default Navbar;

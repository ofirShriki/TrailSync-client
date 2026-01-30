import { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Logo from '../Logo/Logo';

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) => theme.palette.neutral.light,
        color: (theme) => theme.palette.neutral.dark,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box component={Logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h4">TrailSync</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="user name" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

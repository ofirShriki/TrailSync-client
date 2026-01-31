import type React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Logo from '../Icons/Logo/Logo';
import { Home } from '@mui/icons-material';
import NavbarItem from './NavbarItem';

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

      <NavbarItem route="/" icon={<Home />} label="Home" />
      <Box sx={{ flexGrow: 1 }} />
      <NavbarItem
        route="/profile"
        icon={<Avatar alt="user name" src="/static/images/avatar/2.jpg" />}
        label="Profile"
      />
    </Box>
  );
};

export default Navbar;

import React, { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material';
import type { Theme } from '@emotion/react';

interface NavbarItemProps {
  route: string;
  icon: ReactNode;
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ route, icon, label }) => {
  const baseSx: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 1,
    borderRadius: 1,
    width: '100%',
    boxSizing: 'border-box',
    p: 1,
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.15)',
    },
  };

  return (
    <NavLink to={route} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Button
          startIcon={icon}
          sx={{
            ...baseSx,
            backgroundColor: isActive ? 'rgba(25, 118, 210, 0.1)' : baseSx.backgroundColor,
            color: isActive ? 'primary.main' : 'text.secondary',
          }}
        >
          <Typography>{label}</Typography>
        </Button>
      )}
    </NavLink>
  );
};

export default NavbarItem;

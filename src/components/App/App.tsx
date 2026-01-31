import type React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Home />
      </Box>
    </Box>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Navbar />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;

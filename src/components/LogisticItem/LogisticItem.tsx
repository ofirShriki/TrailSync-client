import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogisticItemProps {
  label: string;
  value: string;
}

const LogisticItem: React.FC<LogisticItemProps> = ({ label, value }) => (
  <Box>
    <Typography>{label}</Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {value}
    </Typography>
  </Box>
);

export default LogisticItem;

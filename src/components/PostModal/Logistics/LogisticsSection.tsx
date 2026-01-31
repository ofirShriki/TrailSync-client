import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import LogisticItem from '../../LogisticItem/LogisticItem';

interface LogisticsSectionProps {
  region: string;
  numberOfDays: number;
  price: number;
}

const LogisticsSection: React.FC<LogisticsSectionProps> = ({ region, numberOfDays, price }) => {
  const logisticsData = [
    { label: 'Region', value: region },
    { label: 'Duration', value: `${numberOfDays} days` },
    { label: 'Estimated Price', value: `$${price}` },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Logistics
      </Typography>
      <Grid container spacing={2}>
        {logisticsData.map((item) => (
          <LogisticItem label={item.label} value={item.value} />
        ))}
      </Grid>
    </Box>
  );
};

export default LogisticsSection;

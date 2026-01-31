import React from 'react';
import type { Post } from '../../types/post';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface PostMetadataProps {
  location: Post['location'];
  numberOfDays: Post['numberOfDays'];
  price: Post['price'];
}

const PostMetadata: React.FC<PostMetadataProps> = ({ location, numberOfDays, price }) => {
  const itemsToDisplay = [
    {
      iconComponent: LocationOnIcon,
      text: `${location.city}, ${location.country}`,
    },
    {
      iconComponent: CalendarTodayIcon,
      text: `${numberOfDays} days`,
    },
    {
      iconComponent: AttachMoneyIcon,
      text: `${price}`,
    },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      {itemsToDisplay.map(({ iconComponent: IconComponent, text }, index) => (
        <React.Fragment key={index}>
          <IconComponent fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {text}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default PostMetadata;

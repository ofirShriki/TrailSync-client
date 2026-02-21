import React from 'react';
import { IconButton, Card, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import style from './PhotoPreviewCard.style';

interface PhotoPreviewCardProps {
  index: number;
  image?: string;
  onChange: (value: File[]) => void;
  handleRemovePhoto: (index: number, onChange: (value: File[]) => void) => void;
}

const PhotoPreviewCard: React.FC<PhotoPreviewCardProps> = ({
  index,
  image,
  onChange,
  handleRemovePhoto,
}) => {
  return (
    <Card key={index} sx={style.photoCard}>
      <CardMedia
        component="img"
        image={image}
        alt={`Preview ${index + 1}`}
        sx={style.photoImage}
      />
      <IconButton
        size="small"
        onClick={() => handleRemovePhoto(index, onChange)}
        sx={style.photoRemoveButton}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default PhotoPreviewCard;

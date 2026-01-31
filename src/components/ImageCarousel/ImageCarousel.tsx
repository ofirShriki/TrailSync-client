import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

interface ImageCarouselProps {
  photos: string[];
  alt?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ photos, alt = 'carousel image' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <Box
        component="img"
        src={photos[currentImageIndex]}
        alt={alt}
        sx={{ width: '100%', borderRadius: 2, height: 200, objectFit: 'cover' }}
      />
      {photos.length > 1 && (
        <>
          <Button
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 32,
            }}
          >
            ‹
          </Button>
          <Button
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 32,
            }}
          >
            ›
          </Button>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
            {photos.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: idx === currentImageIndex ? 'primary.main' : 'gray',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ImageCarousel;

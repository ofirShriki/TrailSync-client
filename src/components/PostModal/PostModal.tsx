import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Post } from '../../types/post';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import LogisticsSection from './Logistics/LogisticsSection';

import style from './PostModal.module.css';
import GenericModal from '../GenericModal/GenericModal';

interface PostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  post: Post;
}

const PostModal: React.FC<PostModalProps> = ({ isModalOpen, setIsModalOpen, post }) => {
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <Box className={style.header}>
        <IconButton onClick={handleCloseModal} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">{post.title}</Typography>
      </Box>

      <Box className={style.content}>
        <Box className={style.column}>
          <iframe className={style.iframe} src={post.mapLink} allowFullScreen loading="lazy" />
          <ImageCarousel photos={post.photos} alt={post.title} />
        </Box>

        <Box className={style.column}>
          <Box className={style.description}>
            <Typography variant="h6" className={style.descriptionTitle}>
              Description
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </Box>

          <LogisticsSection
            region={`${post.location.city}, ${post.location.country}`}
            numberOfDays={post.numberOfDays}
            price={post.price}
          />
        </Box>
      </Box>
    </GenericModal>
  );
};

export default PostModal;

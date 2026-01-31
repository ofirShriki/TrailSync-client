import React from 'react';
import { Box, Modal } from '@mui/material';

interface GenericModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({ isModalOpen, setIsModalOpen, children }) => {
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 2,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default GenericModal;

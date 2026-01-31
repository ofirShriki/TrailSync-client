import React from "react";
import { Box, Modal } from "@mui/material";
import styles from "./GenericModal.styles";

interface GenericModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
	isModalOpen,
	setIsModalOpen,
	children,
}) => {
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<Modal open={isModalOpen} onClose={handleCloseModal}>
			<Box sx={styles.root}>{children}</Box>
		</Modal>
	);
};

export default GenericModal;

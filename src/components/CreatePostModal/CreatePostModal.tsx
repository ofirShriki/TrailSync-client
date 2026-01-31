import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./CreatePostModal.styles.ts";
import GenericModal from "../GenericModal/index.ts";

interface CreatePostModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	isModalOpen,
	setIsModalOpen,
}) => {
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<Box sx={style.header}>
				<IconButton onClick={handleCloseModal} size="small">
					<ArrowBackIcon />
				</IconButton>
				<Typography variant="h5">Share your trail</Typography>
			</Box>
		</GenericModal>
	);
};

export default CreatePostModal;

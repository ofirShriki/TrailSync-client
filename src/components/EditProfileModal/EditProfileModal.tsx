import React from "react";
import GenericModal from "../GenericModal/GenericModal";
import type { User } from "../../types/user";

interface EditProfileModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	user: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
	isModalOpen,
	setIsModalOpen,
}) => {
	return (
		<GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			TODO: add edit profile form here
		</GenericModal>
	);
};

export default EditProfileModal;

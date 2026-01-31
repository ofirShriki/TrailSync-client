import React from "react";
import GenericModal from "../GenericModal";
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
			edit profile modal
		</GenericModal>
	);
};

export default EditProfileModal;

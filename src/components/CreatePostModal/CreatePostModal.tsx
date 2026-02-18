import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postService } from "../../services/postService";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useAuth } from "../../contexts/AuthContext.jsx";
import UpsertPostModal from "../UpsertPostModal";

interface CreatePostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const createPost = async (formData: FormData) =>
    postService.createPost(formData);

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
    });
  };

  return (
    <UpsertPostModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      mutationFunc={createPost}
      onSuccess={handleSuccess}
      title="Share your trail"
      submitLabel="Publish"
    />
  );
};

export default CreatePostModal;

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "../../services/postService";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useAuth } from "../../contexts/AuthContext.jsx";
import UpsertPostModal from "../UpsertPostModal";
import type { Post } from "../../types/post.js";
import type { CreatePostFormData } from "../UpsertPostModal/UpsertPostModal";
import { urlsToFiles } from "../../utils/photoUtils";

interface CreatePostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  post: Post;
}

const UpdatePostModal: React.FC<CreatePostModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  post,
}) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { data: photoFiles = [] } = useQuery({
    queryKey: [QUERY_KEYS.POST_PHOTOS, post.id],
    queryFn: () => urlsToFiles(post.photos),
    enabled: isModalOpen && post.photos.length > 0,
  });

  const updatePost = async (formData: FormData) =>
    postService.updatePost(post.id, formData);

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
    });
  };

  const initialValues: Partial<CreatePostFormData> = {
    title: post.title,
    mapLink: post.mapLink,
    price: post.price,
    numberOfDays: post.numberOfDays,
    location: {
      country: post.location.country,
      city: post.location.city,
    },
    description: post.description,
    photos: photoFiles.length > 0 ? photoFiles : [],
  };

  return (
    <UpsertPostModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      mutationFunc={updatePost}
      onSuccess={handleSuccess}
      initialValues={initialValues}
      title="Update your trail"
      submitLabel="Update"
    />
  );
};

export default UpdatePostModal;

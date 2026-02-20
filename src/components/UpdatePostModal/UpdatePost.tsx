import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { postService } from '../../services/postService';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useAuth } from '../../contexts/AuthContext.jsx';
import UpsertPostModal from '../UpsertPostModal';
import type { Post } from '../../types/post.js';
import type { UpsertPostFormData } from '../UpsertPostModal/UpsertPostModal';
import { urlsToFiles } from '../../utils/photoUtils';

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
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const getFilesFromUrls = async (urls: string[]) => {
    const files = await urlsToFiles(urls);

    setPhotoFiles(files);
  };

  useEffect(() => {
    getFilesFromUrls(post.photos);
  }, [post.photos]);

  const updatePost = async (formData: FormData) =>
    postService.updatePost(post.id, formData);

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
    });
  };

  const initialValues: Partial<UpsertPostFormData> = useMemo(
    () => ({
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
      photosToDelete: [],
    }),
    [
      photoFiles,
      post.description,
      post.location.city,
      post.location.country,
      post.mapLink,
      post.numberOfDays,
      post.price,
      post.title,
    ]
  );

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

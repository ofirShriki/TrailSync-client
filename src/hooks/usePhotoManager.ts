import React, { useEffect, useState, type ChangeEvent } from 'react';
import { generatePhotosPreviews } from '../utils/photoUtils';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import type { UpsertPostFormData } from '../types/uspertPostFormData';

export const MAX_PHOTOS = 5;

export const usePhotoManager = ({
  initialPhotos = [],
  photoFiles = [],
  setValue,
  getValues,
}: {
  initialPhotos?: File[];
  photoFiles?: File[];
  setValue: UseFormSetValue<UpsertPostFormData>;
  getValues: UseFormGetValues<UpsertPostFormData>;
}) => {
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  useEffect(() => {
    const loadFormerPreviews = async () => {
      const previews = await generatePhotosPreviews(initialPhotos);

      setPhotoPreviews(previews);
    };

    loadFormerPreviews();
  }, [initialPhotos]);

  const handlePhotoUpload = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void,
    setPhotoLimitWarning: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const newPreviews: string[] = [];
      let filesToAdd = newFiles;

      const currentCount = photoPreviews.length;

      if (currentCount + newFiles.length > MAX_PHOTOS) {
        setPhotoLimitWarning(
          `Only the first ${MAX_PHOTOS} photos in total will be kept.`
        );

        const allowedMargin = MAX_PHOTOS - currentCount;
        filesToAdd = newFiles.slice(0, allowedMargin);
      } else {
        setPhotoLimitWarning(null);
      }

      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);

          if (newPreviews.length === filesToAdd.length) {
            setPhotoPreviews(prev => [...prev, ...newPreviews]);
          }
        };

        reader.readAsDataURL(file);
      });

      const updatedFiles = [...photoFiles, ...filesToAdd];
      onChange(updatedFiles);
    }
  };

  const handleRemovePhoto = (
    index: number,
    onChange: (value: File[]) => void
  ) => {
    const currentPhotosToDelete = getValues('photosToDelete') || [];
    const currInitialPhotos = initialPhotos.filter(
      photo => !currentPhotosToDelete.includes(photo.name)
    );

    const removedFile = currInitialPhotos?.find((_, i) => i === index);

    if (removedFile) {
      setValue('photosToDelete', [
        ...currentPhotosToDelete,
        `${removedFile.name}`,
      ]);
    } else {
      const updatedFiles = photoFiles.filter(
        (_, i) => i !== index - currInitialPhotos.length
      );

      onChange(updatedFiles);
    }

    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return {
    photoPreviews,
    handlePhotoUpload,
    handleRemovePhoto,
    setPhotoPreviews,
  };
};

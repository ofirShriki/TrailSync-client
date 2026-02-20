import { useEffect, useState, type ChangeEvent } from 'react';
import { generatePhotosPreviews } from '../utils/photoUtils';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import type { UpsertPostFormData } from '../types/uspertPostFormData';

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
    onChange: (value: File[]) => void
  ) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const newPreviews: string[] = [];

      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);

          if (newPreviews.length === newFiles.length) {
            setPhotoPreviews(prev => [...prev, ...newPreviews]);
          }
        };

        reader.readAsDataURL(file);
      });

      const updatedFiles = [...photoFiles, ...newFiles];
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

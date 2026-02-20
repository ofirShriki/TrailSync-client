import type { UseMutateFunction } from '@tanstack/react-query';
import type { UpsertPostFormData } from '../types/uspertPostFormData';
import type { Post } from '../types/post';

export const onSubmitUpsertForm = (
  data: UpsertPostFormData,
  submitMutate: UseMutateFunction<Post, Error, FormData, unknown>
) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('mapLink', data.mapLink);
  formData.append('price', data.price.toString());
  formData.append('numberOfDays', data.numberOfDays.toString());
  formData.append('location[country]', data.location.country);

  if (data.location.city) {
    formData.append('location[city]', data.location.city);
  }

  formData.append('description', data.description);

  data.photosToDelete?.forEach(photo => {
    formData.append('photosToDelete', photo);
  });

  data.photos.forEach(file => {
    formData.append('photos', file);
  });

  submitMutate(formData);
};

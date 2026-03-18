import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import style from '../CreatePostModal/CreatePostModal.styles.ts';
import GenericModal from '../GenericModal/index.ts';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { GoogleMaps } from '../Icons/index.ts';
import { useMutation } from '@tanstack/react-query';
import type { Post } from '../../types/post.ts';
import type { UpsertPostFormData } from '../../types/uspertPostFormData.ts';
import PhotoPreviewCard from './PhotoPreviewCard/PhotoPreviewCard.tsx';
import { onSubmitUpsertForm } from '../../utils/upsertPostUtils.ts';
import { MAX_PHOTOS, usePhotoManager } from '../../hooks/usePhotoManager.ts';

interface UpsertPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  mutationFunc: (formData: FormData) => Promise<Post>;
  title?: string;
  submitLabel?: string;
  onSuccess?: () => void;
  initialValues?: Partial<UpsertPostFormData>;
}

const UpsertPostModal: React.FC<UpsertPostModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  initialValues = {},
  mutationFunc,
  onSuccess,
  title,
  submitLabel,
}) => {
  const [photoLimitWarning, setPhotoLimitWarning] = React.useState<
    string | null
  >(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<UpsertPostFormData>({
    mode: 'onChange',
    defaultValues: {
      ...initialValues,
    },
  });

  const photoFiles = useWatch({
    control,
    name: 'photos',
  });

  const memoizedInitialPhotos = useMemo(
    () => initialValues.photos || [],
    [initialValues.photos]
  );

  const {
    handlePhotoUpload,
    handleRemovePhoto,
    photoPreviews,
    setPhotoPreviews,
  } = usePhotoManager({
    getValues,
    setValue,
    initialPhotos: memoizedInitialPhotos,
    photoFiles,
  });

  const {
    mutate: submitMutate,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: (formData: FormData) => mutationFunc(formData),
    onSuccess: () => {
      handleCloseModal();
      onSuccess && onSuccess();
    },
  });

  const handleCloseModal = () => {
    reset();
    setPhotoPreviews([]);
    setIsModalOpen(false);
  };

  return (
    <GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <Box sx={style.header}>
        <IconButton onClick={handleCloseModal} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(() =>
          onSubmitUpsertForm(getValues(), submitMutate)
        )}
        sx={style.form}
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Trip Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="mapLink"
          control={control}
          rules={{
            required: 'Google Maps URL is required',
            pattern: {
              value:
                /^https?:\/\/(www\.)?(google\.com\/maps|maps\.google\.com|goo\.gl\/maps)/,
              message: 'Please enter a valid Google Maps URL',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Google Maps URL"
              placeholder="https://maps.google.com/..."
              fullWidth
              error={!!errors.mapLink}
              helperText={errors.mapLink?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <GoogleMaps />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Box sx={style.formRow}>
          <Controller
            name="location.country"
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                error={!!errors.location?.country}
                helperText={errors.location?.country?.message}
              />
            )}
          />
          <Controller
            name="location.city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City (Optional)"
                fullWidth
                error={!!errors.location?.city}
                helperText={errors.location?.city?.message}
              />
            )}
          />
        </Box>

        <Box sx={style.formRow}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: 'Price is required',
              min: { value: 0, message: 'Invalid sum' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                onChange={e => {
                  const val = e.target.value;
                  field.onChange(val === '' ? '' : Number(val));
                }}
                error={!!errors.price}
                helperText={errors.price?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Controller
            name="numberOfDays"
            control={control}
            rules={{
              required: 'Number of days is required',
              min: { value: 1, message: 'Must be at least 1 day' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duration (days)"
                type="number"
                fullWidth
                onChange={e => {
                  const val = e.target.value;
                  field.onChange(val === '' ? '' : Number(val));
                }}
                error={!!errors.numberOfDays}
                helperText={errors.numberOfDays?.message}
              />
            )}
          />
        </Box>

        <Controller
          name="description"
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={4}
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="photos"
          control={control}
          rules={{
            validate: value => {
              console.log({ value });

              if (value.length === 0 && photoPreviews.length === 0) {
                return 'At least one photo is required';
              }

              if (value.length > MAX_PHOTOS) {
                return `You can only upload up to ${MAX_PHOTOS} photos`;
              }

              return true;
            },
          }}
          render={({ field: { onChange } }) => (
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<AddPhotoAlternateIcon />}
                disabled={photoPreviews.length >= MAX_PHOTOS}
                sx={style.addPhotosButton}
              >
                Add Photos
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={e =>
                    handlePhotoUpload(e, onChange, setPhotoLimitWarning)
                  }
                />
              </Button>
              {errors.photos && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={style.errorText}
                >
                  {errors.photos.message}
                </Typography>
              )}
              {photoLimitWarning && (
                <Typography sx={style.photoLimitWarning}>
                  {photoLimitWarning}
                </Typography>
              )}

              {photoPreviews.length > 0 && (
                <Box sx={style.photoPreviewContainer}>
                  {photoPreviews.map((preview, index) => (
                    <PhotoPreviewCard
                      index={index}
                      image={preview}
                      onChange={onChange}
                      handleRemovePhoto={handleRemovePhoto}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        />

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ||
              'Failed to submit post. Please try again.'}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={Object.keys(errors).length > 0 || isPending}
        >
          {isPending ? <CircularProgress size={24} /> : submitLabel}
        </Button>
      </Box>
    </GenericModal>
  );
};

export default UpsertPostModal;

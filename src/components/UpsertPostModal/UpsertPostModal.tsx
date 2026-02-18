import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Card,
  CardMedia,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import style from "../CreatePostModal/CreatePostModal.styles.ts";
import GenericModal from "../GenericModal/index.ts";
import { useForm, Controller } from "react-hook-form";
import { GoogleMaps } from "../Icons/index.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Post } from "../../types/post.ts";
import { generatePhotosPreviews } from "../../utils/photoUtils";
import { QUERY_KEYS } from "../../constants/queryKeys.ts";

export interface CreatePostFormData {
  title: string;
  mapLink: string;
  price: number;
  numberOfDays: number;
  location: {
    city?: string;
    country: string;
  };
  description: string;
  photos: File[];
}

interface UpsertPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  mutationFunc: (formData: FormData) => Promise<Post>;
  title?: string;
  submitLabel?: string;
  onSuccess?: () => void;
  initialValues?: Partial<CreatePostFormData>;
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
  const { data: photoPreviews = [] } = useQuery({
    queryKey: [QUERY_KEYS.PHOTO_PREVIEWS, initialValues.photos],
    queryFn: () => generatePhotosPreviews(initialValues.photos ?? []),
    enabled:
      isModalOpen && !!initialValues.photos && initialValues.photos.length > 0,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreatePostFormData>({
    mode: "onChange",
    defaultValues: {
      title: initialValues.title || "",
      mapLink: initialValues.mapLink || "",
      price: initialValues.price ?? 0,
      numberOfDays: initialValues.numberOfDays ?? 0,
      location: {
        country: initialValues.location?.country || "",
        city: initialValues.location?.city || "",
      },
      description: initialValues.description || "",
      photos: initialValues.photos || [],
    },
  });

  const photoFiles = watch("photos") || [];

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
    setIsModalOpen(false);
  };

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void
  ) => {
    const files = event.target.files;

    if (files) {
      onChange([...photoFiles, ...Array.from(files)]);
    }
  };

  const handleRemovePhoto = (
    index: number,
    onChange: (value: File[]) => void
  ) => {
    const updatedFiles = photoFiles.filter((_, i) => i !== index);

    onChange(updatedFiles);
  };

  const onSubmitForm = (data: CreatePostFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("mapLink", data.mapLink);
    formData.append("price", data.price.toString());
    formData.append("numberOfDays", data.numberOfDays.toString());
    formData.append("location[country]", data.location.country);

    if (data.location.city) {
      formData.append("location[city]", data.location.city);
    }

    formData.append("description", data.description);

    data.photos.forEach(file => {
      formData.append("photos", file);
    });

    submitMutate(formData);
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
        onSubmit={handleSubmit(onSubmitForm)}
        sx={style.form}
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
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
            required: "Google Maps URL is required",
            pattern: {
              value:
                /^https?:\/\/(www\.)?(google\.com\/maps|maps\.google\.com|goo\.gl\/maps)/,
              message: "Please enter a valid Google Maps URL",
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
            rules={{ required: "Country is required" }}
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
              required: "Price is required",
              min: { value: 0, message: "Invalid sum" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                onChange={e => field.onChange(Number(e.target.value))}
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
              required: "Number of days is required",
              min: { value: 1, message: "Must be at least 1 day" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duration (days)"
                type="number"
                fullWidth
                onChange={e => field.onChange(Number(e.target.value))}
                error={!!errors.numberOfDays}
                helperText={errors.numberOfDays?.message}
              />
            )}
          />
        </Box>

        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
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
            validate: value =>
              (value && value.length > 0) || "At least one photo is required",
          }}
          render={({ field: { onChange } }) => (
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<AddPhotoAlternateIcon />}
                sx={style.addPhotosButton}
              >
                Add Photos
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={e => handlePhotoUpload(e, onChange)}
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

              {photoPreviews.length > 0 && (
                <Box sx={style.photoPreviewContainer}>
                  {photoPreviews.map((preview, index) => (
                    <Card key={index} sx={style.photoCard}>
                      <CardMedia
                        component="img"
                        image={preview}
                        alt={`Preview ${index + 1}`}
                        sx={style.photoImage}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemovePhoto(index, onChange)}
                        sx={style.photoRemoveButton}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          )}
        />

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ||
              "Failed to submit post. Please try again."}
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

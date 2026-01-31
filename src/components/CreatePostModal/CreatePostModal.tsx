import React, { useState } from "react";
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
import style from "./CreatePostModal.styles.ts";
import GenericModal from "../GenericModal/index.ts";
import { useForm, Controller } from "react-hook-form";
import { GoogleMaps } from "../Icons/index.ts";
import { useMutation } from "@tanstack/react-query";
import { postService } from "../../services/postService";

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

interface CreatePostModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	refetchPosts: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	isModalOpen,
	setIsModalOpen,
	refetchPosts,
}) => {
	const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<CreatePostFormData>({
		mode: "onChange",
		defaultValues: {
			photos: [],
		},
	});

	const {
		mutate: createPost,
		isError,
		error,
		isPending,
	} = useMutation({
		mutationFn: (formData: FormData) => postService.createPost(formData),
		onSuccess: () => {
			handleCloseModal();
			refetchPosts();
		},
	});

	const photoFiles = watch("photos") || [];

	const handleCloseModal = () => {
		reset();
		setPhotoPreviews([]);
		setIsModalOpen(false);
	};

	const handlePhotoUpload = (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: File[]) => void,
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
		onChange: (value: File[]) => void,
	) => {
		const updatedFiles = photoFiles.filter((_, i) => i !== index);
		onChange(updatedFiles);
		setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
	};

	const onSubmit = (data: CreatePostFormData) => {
		// Create FormData for multipart/form-data upload
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

		createPost(formData);
	};

	return (
		<GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<Box sx={style.header}>
				<IconButton onClick={handleCloseModal} size="small">
					<ArrowBackIcon />
				</IconButton>
				<Typography variant="h5">Share your trail</Typography>
			</Box>
			<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style.form}>
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
							"Failed to create post. Please try again."}
					</Alert>
				)}
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					disabled={Object.keys(errors).length > 0 || isPending}
				>
					{isPending ? <CircularProgress size={24} /> : "Publish"}
				</Button>
			</Box>
		</GenericModal>
	);
};

export default CreatePostModal;

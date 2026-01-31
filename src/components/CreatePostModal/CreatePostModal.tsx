import React from "react";
import {
	Box,
	Typography,
	IconButton,
	TextField,
	Button,
	InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./CreatePostModal.styles.ts";
import GenericModal from "../GenericModal/index.ts";
import { useForm, Controller } from "react-hook-form";
import { GoogleMaps } from "../Icons/index.ts";

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
	photos: string[];
}

interface CreatePostModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	isModalOpen,
	setIsModalOpen,
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreatePostFormData>({
		mode: "onChange",
	});

	const handleCloseModal = () => {
		reset();
		setIsModalOpen(false);
	};

	const onSubmit = (data: CreatePostFormData) => {
		console.log("Form submitted:", data);
		// TODO: Handle post creation
		handleCloseModal();
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

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					disabled={Object.keys(errors).length > 0}
				>
					Publish
				</Button>
			</Box>
		</GenericModal>
	);
};

export default CreatePostModal;

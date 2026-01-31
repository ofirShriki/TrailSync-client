import React, { useState, type ChangeEvent, useEffect } from "react";
import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import GenericModal from "../GenericModal";
import type { User } from "../../types/user";
import { userService, type UpdateUserData } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";
import style from "./EditProfileModal.styles";

interface EditProfileModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	user: User;
	onSuccess?: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
	isModalOpen,
	setIsModalOpen,
	user,
	onSuccess,
}) => {
	const { userId } = useAuth();
	const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
		null,
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm<UpdateUserData>({
		mode: "onChange",
		defaultValues: {
			username: user.username,
			email: user.email,
		},
	});

	useEffect(() => {
		if (user) {
			reset({
				username: user.username,
				email: user.email,
			});
			setProfileImagePreview(
				`${import.meta.env.VITE_SERVER_URL}/${user.profilePicture}`,
			);
		}
	}, [user, reset]);

	const {
		mutate: updateProfile,
		isError,
		error,
		isPending,
	} = useMutation({
		mutationFn: (data: UpdateUserData) => userService.updateUser(userId!, data),
		onSuccess: () => {
			handleCloseModal();
			onSuccess?.();
		},
	});

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setValue("profilePicture", file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCloseModal = () => {
		reset();
		setProfileImagePreview(null);
		setIsModalOpen(false);
	};

	const onSubmit = (data: UpdateUserData) => {
		updateProfile(data);
	};

	return (
		<GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<Box sx={style.header}>
				<IconButton onClick={handleCloseModal} size="small">
					<ArrowBackIcon />
				</IconButton>
				<Typography variant="h5">Edit Profile</Typography>
			</Box>

			<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style.form}>
				{isError && (
					<Alert severity="error">
						{(error as any)?.response?.data?.message ||
							"Failed to update profile. Please try again."}
					</Alert>
				)}

				<Box sx={style.avatarContainer}>
					<Avatar
						src={profileImagePreview || undefined}
						alt={user.username}
						sx={style.avatar}
					/>
					<Button
						variant="outlined"
						component="label"
						startIcon={<AddPhotoAlternateIcon />}
						sx={style.uploadButton}
					>
						Change Photo
						<input
							type="file"
							hidden
							accept="image/*"
							onChange={handleImageUpload}
						/>
					</Button>
				</Box>

				<Controller
					name="username"
					control={control}
					rules={{
						required: "Username is required",
						minLength: {
							value: 3,
							message: "Username must be at least 3 characters",
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label="Username"
							fullWidth
							error={!!errors.username}
							helperText={errors.username?.message}
						/>
					)}
				/>

				<Controller
					name="email"
					control={control}
					rules={{
						required: "Email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Invalid email address",
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label="Email"
							type="email"
							fullWidth
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					rules={{
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label="Change Password (optional)"
							type="password"
							fullWidth
							placeholder="Leave blank to keep current password"
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					disabled={Object.keys(errors).length > 0 || isPending}
				>
					{isPending ? <CircularProgress size={24} /> : "Save Changes"}
				</Button>
			</Box>
		</GenericModal>
	);
};

export default EditProfileModal;

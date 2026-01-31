import {
	Alert,
	Box,
	Button,
	CircularProgress,
	TextField,
	Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Icons";
import { PATHS } from "../../constants/routes";
import { authService, type LoginData } from "../../services/authService";
import styles from "./Login.styles";

const Login = () => {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		mutate: login,
		isError,
		error,
		isPending,
	} = useMutation({
		mutationFn: (data: LoginData) => authService.login(data),
		onSuccess: _data => {
			navigate(PATHS.HOME);
		},
	});

	const onSubmit = (data: LoginData) => {
		login(data);
	};

	return (
		<Box sx={styles.root}>
			<Logo sx={styles.logo} />
			<Typography variant="h1" sx={styles.title}>
				Log In
			</Typography>

			<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
				{isError && (
					<Alert severity="error">
						{(error as any)?.response?.data?.message ||
							"Login failed. Please check your credentials."}
					</Alert>
				)}

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
							disabled={isPending}
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					rules={{
						required: "Password is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label="Password"
							type="password"
							fullWidth
							error={!!errors.password}
							helperText={errors.password?.message}
							disabled={isPending}
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					size="large"
					disabled={isPending}
					sx={styles.submitButton}
				>
					{isPending ? <CircularProgress size={24} /> : "Log In"}
				</Button>
			</Box>
		</Box>
	);
};

export default Login;

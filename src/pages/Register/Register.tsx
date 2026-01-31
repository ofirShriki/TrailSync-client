import { Alert, Box, Button, CircularProgress, TextField, Typography, Avatar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService, type RegisterData } from '../../services/authService';
import styles from './Register.styles';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Register = () => {
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      username: '',
      profilePicture: '',
    },
  });

  const {
    mutate: register,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: (data: RegisterData) => authService.registerWithFile(data),
    onSuccess: ({ tokens: { token, refreshToken }, userId }) => {
      authLogin(token, refreshToken, userId);
      navigate('/home');
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue('profilePicture', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: RegisterData) => {
    register(data);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.avatarContainer}>
        <Typography variant="h1" sx={styles.title}>
          Sign Up
        </Typography>
        <Controller
          name="profilePicture"
          control={control}
          rules={{
            required: 'Profile picture is required',
          }}
          render={() => (
            <>
              <Button component="label" sx={styles.avatarButton} disabled={isPending}>
                <Avatar
                  src={profileImagePreview || undefined}
                  sx={styles.avatar(!!errors.profilePicture)}
                >
                  <AddPhotoAlternateIcon sx={styles.avatarIcon} />
                </Avatar>
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
              {errors.profilePicture && (
                <Typography color="error" variant="caption" sx={styles.errorText}>
                  {errors.profilePicture.message}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary" sx={styles.helperText}>
                Click to upload profile picture
              </Typography>
            </>
          )}
        />
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message || 'Sign up failed. Please try again.'}
          </Alert>
        )}

        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={isPending}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
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
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
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
          {isPending ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>

        <Typography sx={styles.loginText}>
          Already have an account?
          <Button onClick={() => navigate('/')} variant="text">
            Log In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;

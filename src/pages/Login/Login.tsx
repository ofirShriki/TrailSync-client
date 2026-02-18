import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Icons';
import { PATHS } from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';
import { authService, type LoginData } from '../../services/authService';
import styles from './Login.styles';
import googleIcon from '../../assets/googleIcon.svg';

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();

  const [isGoogleLoginError, setIsGoogleLoginError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.HOME);
    }
  }, [isAuthenticated, navigate]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialsRes: TokenResponse) => {
      try {
        const { tokens, userId } = await authService.googleLogin(
          credentialsRes.access_token ?? ''
        );

        authLogin(tokens.token, tokens.refreshToken, userId);

        navigate(PATHS.HOME);
      } catch (_err) {
        setIsGoogleLoginError(true);
      }
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutate: login,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: ({ tokens: { token, refreshToken }, userId }) => {
      authLogin(token, refreshToken, userId);
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
              'Login failed. Please check your credentials.'}
          </Alert>
        )}
        {isGoogleLoginError && (
          <Alert severity="error">Login failed. Please try again</Alert>
        )}

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
          {isPending ? <CircularProgress size={24} /> : 'Log In'}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
          onClick={() => googleLogin()}
          sx={styles.googleButton}
        >
          <img src={googleIcon} alt="Google" /> Log In with Google
        </Button>
      </Box>

      <Typography sx={styles.signUpText}>
        Don't have an account?{' '}
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate(PATHS.REGISTER)}
        >
          Sign Up
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;

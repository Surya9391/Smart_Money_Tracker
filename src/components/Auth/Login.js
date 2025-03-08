import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  InputAdornment, 
  IconButton,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, Lock } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Redirect if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general login error
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Attempting login with:", credentials.email);
      // For demo purposes, accept any email/password combination
      // Simulate API call with shorter timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store auth data
      localStorage.setItem('user', JSON.stringify({ 
        email: credentials.email,
        name: 'John Doe',
        isAuthenticated: true
      }));
      
      // Update auth state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log("Login successful, updating auth state");
      
      // Call the onLogin callback to update app state
      if (onLogin) {
        onLogin();
      }
      
      console.log("Redirecting to dashboard");
      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 65px)', // Adjust for header height
        bgcolor: 'background.default',
        py: 2,
        px: 2
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          width: { xs: '100%', sm: '450px' },
          maxWidth: '100%',
          borderRadius: 2
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h1" 
            color="primary" 
            fontWeight="bold"
            sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
          >
            Smart Money Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Log in to access your dashboard
          </Typography>
        </Box>

        {loginError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {loginError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
            <Link href="#" variant="body2" underline="hover">
              Forgot password?
            </Link>
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              mt: 1, 
              mb: 3,
              py: 1.5,
              position: 'relative'
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Log In'
            )}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                variant="body2" 
                underline="hover" 
                sx={{ fontWeight: 'medium' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 
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
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Person, 
  Phone,
  Lock
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  
  const navigate = useNavigate();
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

  const steps = ['Personal Information', 'Account Security'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general error
    if (registerError) {
      setRegisterError('');
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      // First step validation
      if (!userData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!userData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!userData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (userData.phone && !/^\d{10}$/.test(userData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10 digit phone number';
      }
    } else if (step === 1) {
      // Second step validation
      if (!userData.password) {
        newErrors.password = 'Password is required';
      } else if (userData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(userData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[0-9]/.test(userData.password)) {
        newErrors.password = 'Password must contain at least one number';
      }
      
      if (!userData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (userData.password !== userData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(activeStep)) {
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Attempting registration for:", userData.email);
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Here you would typically send the registration data to your backend
      console.log('Registration data:', userData);
      
      // For demo purposes, create the user account
      localStorage.setItem('user', JSON.stringify({
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        isAuthenticated: true
      }));
      
      // Update auth state
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log("Registration successful, updating auth state");
      
      // Call onRegister if provided
      if (onRegister) {
        onRegister();
      }
      
      console.log("Redirecting to dashboard");
      // Navigate directly to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setRegisterError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              value={userData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={userData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number (optional)"
              name="phone"
              autoComplete="tel"
              value={userData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={userData.password}
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
                      onClick={() => handleTogglePassword('password')}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={userData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => handleTogglePassword('confirm')}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Password must be at least 8 characters and include an uppercase letter and a number.
            </Typography>
          </>
        );
      default:
        return 'Unknown step';
    }
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
          width: { xs: '100%', sm: '500px' },
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
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Join Smart Money Tracker to manage your finances
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {registerError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {registerError}
          </Alert>
        )}

        <Box component="form" onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              variant="contained"
              type={activeStep === steps.length - 1 ? 'submit' : 'button'}
              onClick={activeStep === steps.length - 1 ? null : handleNext}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : activeStep === steps.length - 1 ? (
                'Create Account'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link 
              href="/login" 
              variant="body2" 
              underline="hover" 
              sx={{ fontWeight: 'medium' }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register; 
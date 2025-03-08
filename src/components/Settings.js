import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Snackbar
} from '@mui/material';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    language: 'en',
    currency: 'USD'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSettingChange = (setting) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    setSnackbar({
      open: true,
      message: 'Settings updated successfully',
      severity: 'success'
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }} className="money-paper">
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange('emailNotifications')}
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={handleSettingChange('pushNotifications')}
                    color="primary"
                  />
                }
                label="Push Notifications"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Security
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.twoFactorAuth}
                onChange={handleSettingChange('twoFactorAuth')}
                color="primary"
              />
            }
            label="Two-Factor Authentication"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Preferences
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  onChange={handleSettingChange('language')}
                  label="Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={settings.currency}
                  onChange={handleSettingChange('currency')}
                  label="Currency"
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="INR">INR (₹)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Data Management
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="outlined" color="primary">
                Export Data
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error">
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Settings; 
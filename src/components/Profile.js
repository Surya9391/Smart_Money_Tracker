import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
  TextField,
  Divider,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit,
  PhotoCamera,
  SaveAlt
} from '@mui/icons-material';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    currency: 'USD',
    language: 'English',
    occupation: 'Software Developer',
    monthlyIncome: '5000'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data to backend
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }} className="money-paper">
        {/* Profile Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '4px solid white',
                boxShadow: 3
              }}
              alt={profileData.name}
              src="/path-to-profile-image.jpg"
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' }
              }}
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Typography variant="h4" gutterBottom>
            {profileData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {profileData.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Profile Details */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Personal Information</Typography>
                  <IconButton onClick={isEditing ? handleSave : handleEdit}>
                    {isEditing ? <SaveAlt /> : <Edit />}
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  {Object.entries(profileData).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <TextField
                        fullWidth
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        disabled={!isEditing}
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
          >
            Delete Account
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="money-button"
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 
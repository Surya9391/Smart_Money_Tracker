import React from 'react';
import { Container, Typography, Paper, Grid, useTheme } from '@mui/material';

const About = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, background: darkMode ? '#424242' : '#ffffff' }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ color: darkMode ? '#ffffff' : '#000000' }}>
          About Smart Money Tracker
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: darkMode ? '#e0e0e0' : '#000000' }}>
              Smart Money Tracker is dedicated to helping individuals and businesses manage their finances effectively. 
              We believe that financial literacy and proper money management are key to achieving long-term financial success.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: darkMode ? '#ffffff' : '#000000' }}>
              What We Offer
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: darkMode ? '#e0e0e0' : '#000000' }}>
              • Comprehensive expense tracking
              • Budget planning tools
              • Financial insights and analytics
              • Personalized financial recommendations
              • Secure data management
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Our Values
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: darkMode ? '#e0e0e0' : '#000000' }}>
              • User Privacy
              • Data Security
              • Transparency
              • Innovation
              • User-Friendly Experience
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;

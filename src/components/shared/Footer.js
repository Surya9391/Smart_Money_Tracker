import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = ({ darkMode }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: darkMode ? '#1e1e1e' : '#1976d2',
        color: '#ffffff',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Smart Money Tracker
            </Typography>
            <Typography variant="body2">
              Making financial management easy and accessible for everyone.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" color="inherit" display="block">About Us</Link>
            <Link href="/contact" color="inherit" display="block">Contact</Link>
            <Link href="/blog" color="inherit" display="block">Blog</Link>
            <Link href="/privacy" color="inherit" display="block">Privacy Policy</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Smart Money Tracker. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
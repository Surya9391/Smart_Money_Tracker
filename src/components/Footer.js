import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
  CopyrightRounded
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      className="money-footer"
      sx={{
        mt: 'auto',
        py: 3,
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#1b5e20', // Dark green
        color: 'white',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="gradient-text" gutterBottom>
              Smart Money Tracker
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Your personal finance companion for smart money management and financial freedom.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" className="social-icon" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" className="social-icon" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" className="social-icon" size="small">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" className="social-icon" size="small">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="gradient-text" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              About Us
            </Link>
            <Link href="/blog" color="inherit" display="block" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              Blog
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              Contact
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Privacy Policy
            </Link>
          </Grid>

          {/* Features */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="gradient-text" gutterBottom>
              Features
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }} paragraph>
              • Expense Tracking
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }} paragraph>
              • Budget Planning
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }} paragraph>
              • Financial Reports
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              • Investment Tracking
            </Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="gradient-text" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                support@smartmoneytracker.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                123 Finance Street, Money City
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <CopyrightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
            {' '}{currentYear} Smart Money Tracker. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
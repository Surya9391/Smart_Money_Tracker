import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }} className="money-paper">
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography paragraph>
            We collect information that you provide directly to us, including personal information such as your name, email address, and financial data when you use our services.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <Typography paragraph>
            We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about your account and updates to our services.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Data Security
          </Typography>
          <Typography paragraph>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Data Sharing
          </Typography>
          <Typography paragraph>
            We do not sell or share your personal information with third parties except as necessary to provide our services or as required by law.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Your Rights
          </Typography>
          <Typography paragraph>
            You have the right to access, correct, or delete your personal information at any time through your account settings or by contacting us.
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. Updates to Privacy Policy
          </Typography>
          <Typography paragraph>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
          </Typography>

          <Typography variant="h6" gutterBottom>
            7. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this privacy policy, please contact us at privacy@smartmoneytracker.com.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy; 
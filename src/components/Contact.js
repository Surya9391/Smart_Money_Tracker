import React, { useState } from 'react';
import {
  Container, Typography, Paper, TextField, Button, Grid,
  Snackbar, Alert, Box, Card, CardContent, IconButton,
  Divider, CircularProgress, Accordion, AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Email, Phone, LocationOn, ExpandMore,
  Facebook, Twitter, LinkedIn, Instagram
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const faqs = [
    {
      question: "How can I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we use bank-level encryption to protect all your financial data."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings."
    }
  ];

  const contactInfo = [
    {
      icon: <Email />,
      title: "Email",
      content: "support@smartmoneytracker.com",
      link: "mailto:support@smartmoneytracker.com"
    },
    {
      icon: <Phone />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <LocationOn />,
      title: "Address",
      content: "123 Finance Street, Money City, MC 12345",
      link: "https://maps.google.com"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We will get back to you soon.',
        severity: 'success'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Contact Information Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <IconButton color="primary" sx={{ mb: 2 }}>
                      {info.icon}
                    </IconButton>
                    <Typography variant="h6" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      component="a" 
                      href={info.link}
                      sx={{ 
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {info.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    label="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* FAQs Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton color="primary">
                <Facebook />
              </IconButton>
              <IconButton color="primary">
                <Twitter />
              </IconButton>
              <IconButton color="primary">
                <LinkedIn />
              </IconButton>
              <IconButton color="primary">
                <Instagram />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

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
    </Container>
  );
};

export default Contact; 
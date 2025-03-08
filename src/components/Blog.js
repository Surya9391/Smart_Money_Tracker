import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Personal Finance Basics",
      excerpt: "Learn the fundamental principles of managing your personal finances effectively...",
      date: "March 15, 2024",
      category: "Personal Finance"
    },
    {
      id: 2,
      title: "Investment Strategies for Beginners",
      excerpt: "A comprehensive guide to starting your investment journey...",
      date: "March 14, 2024",
      category: "Investing"
    },
    {
      id: 3,
      title: "How to Save Money on Everyday Expenses",
      excerpt: "Discover practical tips to cut down on your daily expenses without sacrificing quality...",
      date: "March 13, 2024",
      category: "Saving"
    },
    {
      id: 4,
      title: "The Importance of Building an Emergency Fund",
      excerpt: "Learn why having an emergency fund is crucial for financial stability...",
      date: "March 12, 2024",
      category: "Emergency Fund"
    },
    {
      id: 5,
      title: "Credit Score: What It Is and How to Improve It",
      excerpt: "Understand the factors that affect your credit score and how to boost it...",
      date: "March 11, 2024",
      category: "Credit"
    },
    // Add more blog posts here
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Financial Insights Blog
      </Typography>

      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {post.date} | {post.category}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.excerpt}
              </Typography>
              <Button variant="contained" color="primary">
                Read More
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog; 
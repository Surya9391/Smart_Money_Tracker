import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { addTransaction } from '../../api';

const categories = {
  expense: ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Gifts', 'Other'],
  income: ['Salary', 'Freelance', 'Investments', 'Gifts', 'Refunds', 'Other']
};

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD format
    description: ''
  });
  
  const [selectedCategories, setSelectedCategories] = useState(categories.expense);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update formData
    setFormData({
      ...formData,
      [name]: value
    });
    
    // If type changes, update available categories and reset the selected category
    if (name === 'type') {
      setSelectedCategories(categories[value]);
      setFormData(prev => ({
        ...prev,
        category: ''
      }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare transaction data with proper number format for amount
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now() // Temporary ID for demo purposes
      };
      
      // Call API to add transaction
      // In a real app, we would use the returned data from the API
      await addTransaction(transactionData);
      
      // For our mock setup, we'll bypass the API and just use the locally created object
      onTransactionAdded(transactionData);
      
      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        date: new Date().toISOString().slice(0, 10),
        description: ''
      });
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Transaction added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add transaction. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Transaction
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Transaction Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Transaction Type"
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              margin="normal"
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                {selectedCategories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              margin="normal"
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Adding...' : 'Add Transaction'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default TransactionForm; 
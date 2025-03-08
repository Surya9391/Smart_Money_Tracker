import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Divider,
  Grid,
  Chip
} from '@mui/material';
import {
  Fastfood,
  ShoppingBasket,
  WaterDrop,
  ElectricBolt,
  Wifi,
  House,
  DirectionsCar,
  LocalHospital,
  School,
  Commute
} from '@mui/icons-material';

const householdCategories = [
  { name: 'Food & Groceries', icon: <Fastfood color="primary" />, key: 'Food' },
  { name: 'Utilities', icon: <ElectricBolt color="warning" />, key: 'Utilities' },
  { name: 'Rent/Mortgage', icon: <House color="secondary" />, key: 'Housing' },
  { name: 'Transportation', icon: <Commute color="info" />, key: 'Transportation' },
  { name: 'Healthcare', icon: <LocalHospital color="error" />, key: 'Healthcare' },
  { name: 'Education', icon: <School color="success" />, key: 'Education' }
];

const HouseholdExpenses = ({ transactions }) => {
  // Calculate monthly expenses by category
  const monthlyExpenses = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter transactions for the current month and expenses only
    const currentMonthExpenses = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.type === 'expense' &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    // Calculate total for each household category
    const categoryTotals = {};
    let totalMonthlyExpense = 0;

    currentMonthExpenses.forEach(transaction => {
      totalMonthlyExpense += transaction.amount;

      // Map transaction categories to our household categories
      let matchFound = false;
      for (const category of householdCategories) {
        if (transaction.category.includes(category.key) || category.key.includes(transaction.category)) {
          if (!categoryTotals[category.name]) {
            categoryTotals[category.name] = {
              amount: 0,
              icon: category.icon
            };
          }
          categoryTotals[category.name].amount += transaction.amount;
          matchFound = true;
          break;
        }
      }

      // If no match was found, categorize as Other
      if (!matchFound) {
        if (!categoryTotals['Other']) {
          categoryTotals['Other'] = {
            amount: 0,
            icon: <ShoppingBasket />
          };
        }
        categoryTotals['Other'].amount += transaction.amount;
      }
    });

    // Convert to array and calculate percentage
    return Object.entries(categoryTotals)
      .map(([name, data]) => ({
        name,
        amount: data.amount,
        icon: data.icon,
        percentage: totalMonthlyExpense > 0 ? (data.amount / totalMonthlyExpense) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  // Get current month name
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  // Get total household expenses
  const totalExpenses = useMemo(() => {
    return monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [monthlyExpenses]);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {currentMonthName} Household Expenses
      </Typography>

      {monthlyExpenses.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography color="textSecondary">
            No household expenses recorded for this month
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Total Expenses This Month
            </Typography>
            <Typography variant="h4" color="error.main" gutterBottom>
              ${totalExpenses.toLocaleString()}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={1} sx={{ mb: 2 }}>
            {monthlyExpenses.slice(0, 3).map((category) => (
              <Grid item xs={4} key={category.name}>
                <Chip
                  icon={category.icon}
                  label={`$${category.amount.toLocaleString()}`}
                  color="primary"
                  variant="outlined"
                  sx={{ width: '100%', justifyContent: 'flex-start' }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  {category.name}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <List dense sx={{ width: '100%' }}>
            {monthlyExpenses.map((category) => (
              <Box key={category.name} sx={{ mb: 1.5 }}>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {category.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.name} 
                    secondary={`$${category.amount.toLocaleString()}`}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ 
                      sx: { fontWeight: 'bold', color: 'text.primary' } 
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {category.percentage.toFixed(1)}%
                  </Typography>
                </ListItem>
                <LinearProgress 
                  variant="determinate" 
                  value={category.percentage} 
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default HouseholdExpenses; 
import React, { useMemo } from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import {
  TrendingUp as IncomeIcon,
  TrendingDown as ExpenseIcon,
  Savings as SavingsIcon,
  Warning as DebtIcon
} from '@mui/icons-material';

const SummaryCard = ({ title, amount, icon, color }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 1 }}>
              ${amount.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: `${color}20`, p: 1, borderRadius: '50%' }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const SummaryView = ({ data = [] }) => {
  // Calculate summary statistics from transaction data
  const summary = useMemo(() => {
    let income = 0;
    let expenses = 0;
    
    // Process transaction data if available
    if (data && data.length > 0) {
      data.forEach(transaction => {
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else if (transaction.type === 'expense') {
          expenses += transaction.amount;
        }
      });
    } else {
      // Default values if no data
      income = 5000;
      expenses = 3000;
    }
    
    // Calculate derived values
    const savings = Math.max(0, income - expenses);
    const debt = 1000; // This would come from another source in a real app
    
    return { income, expenses, savings, debt };
  }, [data]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Income"
          amount={summary.income}
          icon={<IncomeIcon sx={{ color: 'success.main' }} />}
          color="success.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Expenses"
          amount={summary.expenses}
          icon={<ExpenseIcon sx={{ color: 'error.main' }} />}
          color="error.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Savings"
          amount={summary.savings}
          icon={<SavingsIcon sx={{ color: 'info.main' }} />}
          color="info.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Debt"
          amount={summary.debt}
          icon={<DebtIcon sx={{ color: 'warning.main' }} />}
          color="warning.main"
        />
      </Grid>
    </Grid>
  );
};

export default SummaryView; 
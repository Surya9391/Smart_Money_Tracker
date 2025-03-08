import React from 'react';
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const ExpenseChart = ({ data }) => {
  // Static data for now - will be replaced with real chart later
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const incomeData = [4200, 4500, 4800, 4300, 5000, 5200];
  const expenseData = [3200, 3500, 3300, 3700, 3400, 3900];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Income vs Expenses
      </Typography>
      
      <Grid container spacing={2}>
        {/* Monthly comparison bars */}
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            height: 200, 
            alignItems: 'flex-end'
          }}>
            {months.map((month, index) => (
              <Box key={month} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${100/months.length}%` }}>
                <Box sx={{ 
                  height: `${(incomeData[index]/6000) * 150}px`, 
                  width: '20px',
                  backgroundColor: 'success.main',
                  mb: 0.5
                }} />
                <Box sx={{ 
                  height: `${(expenseData[index]/6000) * 150}px`, 
                  width: '20px',
                  backgroundColor: 'error.main',
                  mb: 0.5
                }} />
                <Typography variant="caption">{month}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        
        {/* Legend */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: 'success.main', mr: 1 }}></Box>
              <Typography variant="body2">Income</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: 'error.main', mr: 1 }}></Box>
              <Typography variant="body2">Expenses</Typography>
            </Box>
          </Box>
        </Grid>
        
        {/* Summary */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">Last Month Income</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: 'success.main', mr: 1 }}>
                ${incomeData[5].toLocaleString()}
              </Typography>
              <ArrowUpward color="success" fontSize="small" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">Last Month Expenses</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: 'error.main', mr: 1 }}>
                ${expenseData[5].toLocaleString()}
              </Typography>
              <ArrowUpward color="error" fontSize="small" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseChart; 
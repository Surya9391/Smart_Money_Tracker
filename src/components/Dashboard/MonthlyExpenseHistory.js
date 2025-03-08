import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Grid
} from '@mui/material';

const MonthlyExpenseHistory = ({ transactions }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [maxAmount, setMaxAmount] = useState(1000); // Default max for scaling

  useEffect(() => {
    // Calculate monthly expenses when transactions change
    if (transactions && transactions.length > 0) {
      const dataByMonth = {};
      
      transactions.forEach(transaction => {
        if (transaction.type === 'expense') {
          const date = new Date(transaction.date);
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          
          if (!dataByMonth[monthYear]) {
            dataByMonth[monthYear] = 0;
          }
          dataByMonth[monthYear] += transaction.amount;
        }
      });

      // Convert to array and sort by date
      const processedData = Object.entries(dataByMonth)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => {
          const [aMonth, aYear] = a.month.split('/');
          const [bMonth, bYear] = b.month.split('/');
          return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
        })
        .slice(-6); // Get last 6 months
      
      // Find max amount for scaling the bars
      const maxValue = Math.max(...processedData.map(item => item.amount), 1000);
      setMaxAmount(maxValue);
      setMonthlyData(processedData);
    } else {
      setMonthlyData([]);
    }
  }, [transactions]);
  
  // If no transactions or expenses, show a message
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Monthly Expense History
        </Typography>
        <Alert severity="info">
          No expense data available. Start tracking your expenses to see monthly history.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Monthly Expense History
      </Typography>
      
      {/* Bar Chart using Material-UI */}
      <Box sx={{ height: 300, mb: 3, mt: 4, px: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          height: '250px', 
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          position: 'relative'
        }}>
          {/* Y-axis labels */}
          <Box sx={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Typography variant="caption">${maxAmount.toLocaleString()}</Typography>
            <Typography variant="caption">${(maxAmount/2).toLocaleString()}</Typography>
            <Typography variant="caption">$0</Typography>
          </Box>
          
          {/* Bars */}
          {monthlyData.map((item) => (
            <Box 
              key={item.month} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                width: `${80/monthlyData.length}%`,
                minWidth: '40px'
              }}
            >
              <Box 
                sx={{ 
                  height: `${(item.amount / maxAmount) * 100}%`, 
                  width: '70%',
                  minWidth: '30px',
                  backgroundColor: 'primary.main',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  transition: 'height 0.5s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    boxShadow: '0 0 8px rgba(0,0,0,0.2)'
                  }
                }} 
              />
              <Typography variant="caption" sx={{ mt: 1 }}>
                {item.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="right">Total Expenses</TableCell>
              <TableCell align="right">Monthly Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyData.map((item, index) => {
              const previousAmount = index > 0 ? monthlyData[index - 1].amount : item.amount;
              const change = previousAmount === 0 ? 0 : ((item.amount - previousAmount) / previousAmount * 100).toFixed(2);
              
              return (
                <TableRow key={item.month}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell align="right">${item.amount.toLocaleString()}</TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: change > 0 ? 'error.main' : change < 0 ? 'success.main' : 'text.secondary'
                    }}
                  >
                    {index === 0 ? '-' : `${change}%`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MonthlyExpenseHistory; 
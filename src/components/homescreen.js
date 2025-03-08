import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box,
  CircularProgress, Divider, Tab, Tabs,
  useMediaQuery, useTheme, Grid
} from '@mui/material';
import { getTransactions, getBudgets, getGoals, deleteTransaction } from '../api';
import SummaryView from './Dashboard/SummaryView';
import ExpenseChart from './Dashboard/ExpenseChart';
import GoalsTracker from './Dashboard/GoalsTracker';
import MonthlyExpenseHistory from './Dashboard/MonthlyExpenseHistory';
import TransactionForm from './Dashboard/TransactionForm';
import TransactionList from './Dashboard/TransactionList';
import HouseholdExpenses from './Dashboard/HouseholdExpenses';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    transactions: [],
    budgets: [],
    goals: []
  });
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [transactions, budgets, goals] = await Promise.all([
          getTransactions(),
          getBudgets(),
          getGoals()
        ]);
        setData({ transactions, budgets, goals });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle adding a new transaction
  const handleAddTransaction = (newTransaction) => {
    setData(prevData => ({
      ...prevData,
      transactions: [newTransaction, ...prevData.transactions]
    }));
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      
      // Update state by filtering out the deleted transaction
      setData(prevData => ({
        ...prevData,
        transactions: prevData.transactions.filter(t => t.id !== transactionId)
      }));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl" disableGutters={isMobile}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Summary Section */}
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'auto'
              }}
            >
              <SummaryView data={data.transactions} />
            </Paper>
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={8} lg={8}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                display: 'flex', 
                flexDirection: 'column', 
                height: { xs: 'auto', sm: '300px', md: '360px' }, 
                minHeight: { xs: '250px', sm: '300px' },
                overflow: 'hidden'
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                Expense Breakdown
              </Typography>
              <Box sx={{ flexGrow: 1, width: '100%', overflow: 'auto' }}>
                <ExpenseChart data={data.transactions} />
              </Box>
            </Paper>
          </Grid>

          {/* Household Expenses Section */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={3}
              sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                display: 'flex', 
                flexDirection: 'column',
                height: { xs: 'auto', sm: '300px', md: '360px' },
                overflow: 'auto'
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                Household Expenses
              </Typography>
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <HouseholdExpenses transactions={data.transactions} />
              </Box>
            </Paper>
          </Grid>

          {/* Goals Section */}
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1.5, sm: 2 }, 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: { xs: '180px', sm: '220px' },
                overflow: 'auto'
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                component="div"
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                Financial Goals
              </Typography>
              <Box sx={{ flexGrow: 1, mt: 1, overflow: 'auto' }}>
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  {data.goals.length > 0 ? data.goals.map((goal) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={goal.id}>
                      <GoalsTracker goal={goal} />
                    </Grid>
                  )) : (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary" align="center">
                        No financial goals found. Create your first goal to track your progress.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Transaction Management Section */}
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 0, 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile={isMobile}
                sx={{
                  '& .MuiTab-root': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    minWidth: { xs: 'auto', sm: 120 },
                    px: { xs: 1, sm: 2 }
                  }
                }}
              >
                <Tab label="Add Transaction" />
                <Tab label="Transaction History" />
                <Tab label="Monthly Summary" />
                <Tab label="Household Expenses" />
              </Tabs>
              
              <Divider />
              
              {/* Tab Panels */}
              <Box 
                p={{ xs: 1.5, sm: 2 }} 
                sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',
                  maxHeight: { xs: '450px', sm: '550px', md: 'none' }
                }}
              >
                {/* Add Transaction Form */}
                {tabValue === 0 && (
                  <TransactionForm onTransactionAdded={handleAddTransaction} />
                )}
                
                {/* Transaction History */}
                {tabValue === 1 && (
                  <TransactionList 
                    transactions={data.transactions} 
                    onDelete={handleDeleteTransaction}
                  />
                )}
                
                {/* Monthly Expense History */}
                {tabValue === 2 && (
                  <MonthlyExpenseHistory transactions={data.transactions} />
                )}

                {/* Household Expenses Detail */}
                {tabValue === 3 && (
                  <Box sx={{ overflow: 'auto' }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      Monthly Household Expenses Breakdown
                    </Typography>
                    <Typography 
                      variant="body2" 
                      paragraph 
                      color="textSecondary"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                    >
                      This section shows detailed breakdowns of your regular household expenses such as food, utilities, rent/mortgage, and other essential home expenditures.
                    </Typography>
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      <Grid item xs={12} md={6}>
                        <HouseholdExpenses transactions={data.transactions} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: { xs: 1.5, sm: 2 }, height: '100%' }}>
                          <Typography 
                            variant="h6" 
                            gutterBottom
                            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                          >
                            Household Expense Saving Tips
                          </Typography>
                          <Typography 
                            variant="subtitle2" 
                            color="primary" 
                            gutterBottom
                            sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
                          >
                            Food & Groceries
                          </Typography>
                          <Typography 
                            variant="body2" 
                            paragraph
                            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                          >
                            • Plan meals and make a shopping list before going to the store
                            • Buy non-perishable items in bulk when on sale
                            • Use loyalty programs and coupons 
                            • Consider store brands over name brands
                          </Typography>
                          
                          <Typography 
                            variant="subtitle2" 
                            color="primary" 
                            gutterBottom
                            sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
                          >
                            Utilities
                          </Typography>
                          <Typography 
                            variant="body2" 
                            paragraph
                            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                          >
                            • Install LED light bulbs
                            • Use programmable thermostats
                            • Unplug electronics when not in use
                            • Run full loads in dishwashers and washing machines
                          </Typography>
                          
                          <Typography 
                            variant="subtitle2" 
                            color="primary" 
                            gutterBottom
                            sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
                          >
                            Housing
                          </Typography>
                          <Typography 
                            variant="body2" 
                            paragraph
                            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                          >
                            • Refinance mortgage if interest rates have dropped
                            • Consider energy-efficient appliances
                            • DIY minor repairs and maintenance
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeScreen;
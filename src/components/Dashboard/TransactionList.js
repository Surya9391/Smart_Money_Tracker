import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  AttachMoney,
  ShoppingCart
} from '@mui/icons-material';

const TransactionList = ({ transactions, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };
  
  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  // Filter and search transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filter !== 'all' && transaction.type !== filter) {
      return false;
    }
    
    // Search by description or category
    if (searchTerm && !transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !transaction.category?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // Pagination
  const paginatedTransactions = sortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transaction History
      </Typography>
      
      {/* Filters and search */}
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filter}
            label="Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="expense">Expenses</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          size="small"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Transactions table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <Chip 
                      size="small"
                      label={transaction.category}
                      icon={transaction.type === 'income' ? <AttachMoney /> : <ShoppingCart />}
                      color={transaction.type === 'income' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell align="right" sx={{ 
                    color: transaction.type === 'income' ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => onDelete && onDelete(transaction.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="textSecondary" sx={{ py: 2 }}>
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionList; 
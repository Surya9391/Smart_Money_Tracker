import axios from 'axios';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// Mock data for development
const mockTransactions = [
  // Food & Groceries
  { id: 1, type: 'expense', category: 'Food', amount: 125.50, date: '2023-08-15', description: 'Weekly grocery shopping' },
  { id: 2, type: 'expense', category: 'Food', amount: 65.25, date: '2023-09-18', description: 'Restaurant dinner' },
  { id: 3, type: 'expense', category: 'Food', amount: 110.30, date: '2023-11-20', description: 'Monthly grocery stock-up' },
  { id: 4, type: 'expense', category: 'Food', amount: 85.50, date: '2024-01-15', description: 'Fresh produce and dairy' },
  { id: 15, type: 'expense', category: 'Food', amount: 42.75, date: '2024-01-25', description: 'Bakery and snacks' },
  
  // Utilities
  { id: 5, type: 'expense', category: 'Utilities', amount: 200.00, date: '2023-09-10', description: 'Electricity bill' },
  { id: 11, type: 'expense', category: 'Utilities', amount: 90.00, date: '2023-12-10', description: 'Water bill' },
  { id: 16, type: 'expense', category: 'Utilities', amount: 145.50, date: '2024-01-10', description: 'Electricity bill - January' },
  { id: 17, type: 'expense', category: 'Utilities', amount: 85.25, date: '2024-01-12', description: 'Internet and cable' },
  { id: 18, type: 'expense', category: 'Utilities', amount: 65.00, date: '2024-01-20', description: 'Gas bill' },
  
  // Housing
  { id: 19, type: 'expense', category: 'Housing', amount: 1200.00, date: '2024-01-01', description: 'Monthly rent payment' },
  { id: 20, type: 'expense', category: 'Housing', amount: 75.50, date: '2024-01-08', description: 'Home repairs' },
  { id: 21, type: 'expense', category: 'Housing', amount: 45.25, date: '2024-01-22', description: 'Cleaning supplies' },
  
  // Transportation
  { id: 2, type: 'expense', category: 'Transportation', amount: 45.00, date: '2023-08-20', description: 'Uber rides' },
  { id: 12, type: 'expense', category: 'Transportation', amount: 60.00, date: '2023-12-15', description: 'Gas for car' },
  { id: 22, type: 'expense', category: 'Transportation', amount: 55.75, date: '2024-01-05', description: 'Fuel refill' },
  { id: 23, type: 'expense', category: 'Transportation', amount: 120.00, date: '2024-01-18', description: 'Car maintenance' },
  
  // Healthcare
  { id: 9, type: 'expense', category: 'Healthcare', amount: 75.00, date: '2023-11-05', description: 'Prescription medications' },
  { id: 24, type: 'expense', category: 'Healthcare', amount: 150.00, date: '2024-01-09', description: 'Doctor visit copay' },
  { id: 25, type: 'expense', category: 'Healthcare', amount: 35.50, date: '2024-01-24', description: 'Pharmacy - vitamins' },
  
  // Entertainment
  { id: 4, type: 'expense', category: 'Entertainment', amount: 80.00, date: '2023-09-05', description: 'Movie night' },
  { id: 26, type: 'expense', category: 'Entertainment', amount: 65.00, date: '2024-01-13', description: 'Streaming subscriptions' },
  { id: 27, type: 'expense', category: 'Entertainment', amount: 120.50, date: '2024-01-27', description: 'Concert tickets' },
  
  // Shopping
  { id: 7, type: 'expense', category: 'Shopping', amount: 150.00, date: '2023-10-02', description: 'New clothes' },
  { id: 28, type: 'expense', category: 'Shopping', amount: 95.75, date: '2024-01-16', description: 'Winter clothing items' },
  
  // Education
  { id: 29, type: 'expense', category: 'Education', amount: 250.00, date: '2024-01-07', description: 'Online course subscription' },
  { id: 30, type: 'expense', category: 'Education', amount: 35.00, date: '2024-01-21', description: 'Books and reference materials' },
  
  // Gifts
  { id: 14, type: 'expense', category: 'Gifts', amount: 200.00, date: '2024-01-05', description: 'Birthday gift' },
  
  // Income entries
  { id: 3, type: 'income', category: 'Salary', amount: 3000.00, date: '2023-08-01', description: 'Monthly salary' },
  { id: 8, type: 'income', category: 'Freelance', amount: 500.00, date: '2023-10-15', description: 'Project payment' },
  { id: 13, type: 'income', category: 'Bonus', amount: 1000.00, date: '2023-12-20', description: 'Year-end bonus' },
  { id: 31, type: 'income', category: 'Salary', amount: 3050.00, date: '2024-01-01', description: 'January salary' },
  { id: 32, type: 'income', category: 'Freelance', amount: 350.00, date: '2024-01-20', description: 'Side project payment' }
];

const mockBudgets = [
  { id: 1, category: 'Food', amount: 500.00, period: 'monthly' },
  { id: 2, category: 'Transportation', amount: 200.00, period: 'monthly' },
  { id: 3, category: 'Entertainment', amount: 150.00, period: 'monthly' },
  { id: 4, category: 'Shopping', amount: 300.00, period: 'monthly' },
  { id: 5, category: 'Utilities', amount: 350.00, period: 'monthly' },
  { id: 6, category: 'Housing', amount: 1300.00, period: 'monthly' },
  { id: 7, category: 'Healthcare', amount: 200.00, period: 'monthly' },
  { id: 8, category: 'Education', amount: 300.00, period: 'monthly' }
];

const mockGoals = [
  { id: 1, name: 'Emergency Fund', current: 5000, target: 10000, deadline: '2024-12-31' },
  { id: 2, name: 'Vacation Savings', current: 2000, target: 5000, deadline: '2024-06-30' },
  { id: 3, name: 'New Car', current: 15000, target: 30000, deadline: '2025-12-31' }
];

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// User Authentication
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Assuming the API returns user data including a token
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Assuming the API returns user data
  } catch (error) {
    throw error;
  }
};

// Transaction Management
export const getTransactions = async () => {
  // Simulate API delay
  await delay(500);
  return [...mockTransactions]; // Return a copy to avoid mutations
};

export const addTransaction = async (transaction) => {
  // Simulate API delay
  await delay(800);
  
  // In a real API, we would send data to the server
  // Since we're mocking, we'll just add it to our mock data
  // and return the added transaction
  
  // Create a new transaction with a proper ID
  const newTransaction = {
    ...transaction,
    id: transaction.id || Date.now() // Use provided ID or generate one
  };
  
  // In a real app with a backend, we would add to the database
  // Here we just add to our mock array (note: this won't persist on page refresh)
  mockTransactions.push(newTransaction);
  
  return newTransaction;
};

export const deleteTransaction = async (transactionId) => {
  // Simulate API delay
  await delay(600);
  
  // Find the index of the transaction
  const index = mockTransactions.findIndex(t => t.id === transactionId);
  
  if (index !== -1) {
    // Remove the transaction
    mockTransactions.splice(index, 1);
    return { success: true, message: 'Transaction deleted successfully' };
  }
  
  throw new Error('Transaction not found');
};

// Budget Management
export const getBudgets = async () => {
  // Return mock data for development
  return mockBudgets;
  
  /* Original API call
  try {
    const response = await axios.get(`${API_URL}/budgets`);
    return response.data;
  } catch (error) {
    throw error;
  }
  */
};

export const setBudget = async (budgetData) => {
  try {
    const response = await axios.post(`${API_URL}/budgets`, budgetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Analytics
export const getAnalytics = async (timeframe) => {
  try {
    const response = await axios.get(`${API_URL}/analytics?timeframe=${timeframe}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// User Profile
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Goals
export const getGoals = async () => {
  // Return mock data for development
  return mockGoals;
  
  /* Original API call
  try {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  } catch (error) {
    throw error;
  }
  */
};

export const setGoal = async (goalData) => {
  try {
    const response = await axios.post(`${API_URL}/goals`, goalData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Recurring Payments
export const getRecurringPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/recurring-payments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reports
export const generateReport = async (reportType, dateRange) => {
  try {
    const response = await axios.get(`${API_URL}/reports/${reportType}`, { params: dateRange });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Notifications
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Blog Posts
export const getBlogPosts = async () => {
  const response = await axios.get(`${API_URL}/blog`);
  return response.data; // Assuming the API returns an array of blog posts
}; 
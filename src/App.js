import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Snackbar, Alert } from '@mui/material';

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomeScreen from './components/homescreen';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Header from './components/Header';
import Footer from './components/Footer';

// Global styles
import './styles/global.css';

// Helper component to check current route for header display
const AppContent = ({ darkMode, toggleDarkMode, isAuthenticated, handleLogin, handleLogout }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [showTestAlert, setShowTestAlert] = useState(false);  // Set to false to hide the test alert
  
  // Force redirect to login if not authenticated
  useEffect(() => {
    // This ensures auth state is correctly applied when the app loads
    if (!isAuthenticated && !isAuthPage) {
      // We're not on an auth page and not authenticated, redirect will happen via routes
      console.log("Not authenticated and not on auth page, redirecting...");
    }
  }, [isAuthenticated, isAuthPage, location.pathname]);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Test Notification */}
      {showTestAlert && (
        <Snackbar 
          open={showTestAlert} 
          autoHideDuration={6000} 
          onClose={() => setShowTestAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowTestAlert(false)} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            Updated App - Header visibility fixed!
          </Alert>
        </Snackbar>
      )}
      
      {/* Only show Header when not on auth pages or when authenticated */}
      {(!isAuthPage || isAuthenticated) && (
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleLogin} />
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            isAuthenticated ? <HomeScreen darkMode={darkMode} /> : <Navigate to="/login" replace />
          } />
          <Route path="/profile" element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          } />
          <Route path="/settings" element={
            isAuthenticated ? <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : <Navigate to="/login" replace />
          } />
          
          {/* Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* Root path - ALWAYS redirect to login if not authenticated */}
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } />
          
          {/* Catch-all redirect */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </Box>
      
      {/* Show Footer only when authenticated */}
      {isAuthenticated && <Footer />}
    </Box>
  );
};

function App() {
  // Check authentication state from localStorage on initial load
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authState = localStorage.getItem('isAuthenticated');
    console.log("Initial auth state:", authState);
    return authState === 'true';
  });
  
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Handle login action
  const handleLogin = () => {
    console.log("Login handler called");
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // Handle logout action
  const handleLogout = () => {
    console.log("Logout handler called");
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', (!darkMode).toString());
    setDarkMode(!darkMode);
  };

  // Log authentication state changes for debugging
  useEffect(() => {
    console.log("Authentication state changed:", isAuthenticated);
  }, [isAuthenticated]);

  // Create floating money symbols
  useEffect(() => {
    const createMoneySymbols = () => {
      // Clear any existing backgrounds first
      const existing = document.querySelector('.money-background');
      if (existing) existing.remove();
      
      const symbolsContainer = document.createElement('div');
      symbolsContainer.className = 'money-background';
      document.body.appendChild(symbolsContainer);

      const symbols = ['$', '€', '£', '¥', '₹', '₿'];
      const count = 15; // Reduced from 20 to have fewer elements

      for (let i = 0; i < count; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'money-symbol';
        symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = `${Math.random() * 100}vw`;
        symbol.style.animationDuration = `${Math.random() * 30 + 10}s`;
        symbol.style.animationDelay = `${Math.random() * 5}s`;
        symbol.style.opacity = `${Math.random() * 0.3 + 0.1}`; // Lower opacity
        symbolsContainer.appendChild(symbol);
      }

      // Also add some coins
      for (let i = 0; i < count / 3; i++) { // Reduced from count/2 to count/3
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.style.left = `${Math.random() * 100}vw`;
        coin.style.animationDuration = `${Math.random() * 20 + 10}s`;
        coin.style.animationDelay = `${Math.random() * 5}s`;
        coin.style.width = `${Math.random() * 15 + 10}px`; // Slightly smaller coins
        coin.style.height = coin.style.width;
        symbolsContainer.appendChild(coin);
      }
    };

    // Only create background elements if authenticated
    if (isAuthenticated) {
      createMoneySymbols();
    }

    return () => {
      const bg = document.querySelector('.money-background');
      if (bg) bg.remove();
    };
  }, [isAuthenticated]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#7cb342', // Green color for Smart Money
      },
      secondary: {
        main: '#2e7d32', // Darker green
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            overflowX: 'hidden'
          }
        }
      }
    }
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;

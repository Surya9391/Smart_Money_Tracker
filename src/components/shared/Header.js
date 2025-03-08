import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  AccountBalance,
  Info,
  ContactSupport,
  Article,
  Settings,
  ExitToApp,
  Dashboard,
  Person,
  Security
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'About', icon: <Info />, path: '/about' },
    { text: 'Blog', icon: <Article />, path: '/blog' },
    { text: 'Contact', icon: <ContactSupport />, path: '/contact' },
    { text: 'Privacy Policy', icon: <Security />, path: '/privacy-policy' }
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'var(--dark-green)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => handleNavigate('/dashboard')}>
            <AccountBalance />
            <Typography variant="h6">Smart Money Tracker</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                onClick={() => handleNavigate(item.path)}
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                {item.text}
              </Button>
            ))}
            
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ ml: 1 }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleMenuClose(); handleNavigate('/profile'); }}>
          <ListItemIcon><Person fontSize="small" /></ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); handleNavigate('/settings'); }}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleMenuClose(); onLogout(); }}>
          <ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header; 
import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Container,
  useTheme,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery
} from '@mui/material';
import { 
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  DarkMode,
  LightMode,
  Settings,
  Logout
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo';

const Header = ({ darkMode, toggleDarkMode, isAuthenticated, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for profile menu
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);
  
  // State for notifications menu
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const notificationsMenuOpen = Boolean(notificationsAnchorEl);
  
  // Navigation links - different for authenticated vs non-authenticated
  const authLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const publicLinks = [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const navLinks = isAuthenticated ? authLinks : publicLinks;
  
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };
  
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  
  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    handleProfileMenuClose();
    navigate('/login');
  };
  
  return (
    <AppBar 
      position="static" 
      color="primary" 
      sx={{ 
        boxShadow: 1,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: 65
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo */}
          <Box 
            component={RouterLink} 
            to={isAuthenticated ? "/dashboard" : "/login"}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Logo height={40} />
          
            {/* Title */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                fontWeight: 700,
                color: 'red',
                display: { xs: 'block', sm: 'block' },
                mr: 2
              }}
            >
              SMART MONEY
            </Typography>
          </Box>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>
          )}
          
          {/* Right-side Icons */}
          <Box sx={{ display: 'flex' }}>
            {/* Dark Mode Toggle */}
            <IconButton 
              color="inherit" 
              onClick={toggleDarkMode}
              sx={{ ml: 1 }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            
            {/* Authenticated-only controls */}
            {isAuthenticated && (
              <>
                {/* Notifications */}
                <IconButton
                  color="inherit"
                  onClick={handleNotificationsMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Notifications />
                </IconButton>
                
                {/* Settings */}
                <IconButton
                  color="inherit"
                  component={RouterLink}
                  to="/settings"
                  sx={{ ml: 1 }}
                >
                  <Settings />
                </IconButton>
                
                {/* Profile */}
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}
            
            {/* Login/Register buttons for non-authenticated users */}
            {!isAuthenticated && (
              <>
                <Button 
                  component={RouterLink} 
                  to="/login"
                  sx={{ ml: 1 }}
                >
                  Login
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/register"
                  variant="contained"
                  sx={{ ml: 1 }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          component={RouterLink} 
          to="/profile" 
          onClick={handleProfileMenuClose}
        >
          Profile
        </MenuItem>
        <MenuItem 
          component={RouterLink} 
          to="/settings" 
          onClick={handleProfileMenuClose}
        >
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={notificationsMenuOpen}
        onClose={handleNotificationsMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleNotificationsMenuClose}>
          No new notifications
        </MenuItem>
      </Menu>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2 }}>
            <Logo height={40} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700, color: 'primary.main', mt: 1 }}
            >
              SMART MONEY
            </Typography>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem 
                button 
                key={link.name} 
                component={RouterLink} 
                to={link.path}
              >
                <ListItemText primary={link.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {isAuthenticated ? (
            <List>
              <ListItem button component={RouterLink} to="/profile">
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button component={RouterLink} to="/settings">
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button component={RouterLink} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={RouterLink} to="/register">
                <ListItemText primary="Register" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header; 
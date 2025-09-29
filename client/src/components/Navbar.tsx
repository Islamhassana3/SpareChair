import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material';
import { AccountCircle, BusinessCenter } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <BusinessCenter sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            ChairShare
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/listings">
            Find Spaces
          </Button>

          {isAuthenticated ? (
            <>
              {user?.userType === 'HOST' && (
                <Button color="inherit" component={Link} to="/create-listing">
                  List Your Space
                </Button>
              )}
              <Button color="inherit" component={Link} to="/bookings">
                My Bookings
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user?.avatar ? (
                  <Avatar src={user.avatar} alt={user.firstName} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
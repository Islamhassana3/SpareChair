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
  Container,
} from '@mui/material';
import { BusinessCenter } from '@mui/icons-material';
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
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1.5, px: { xs: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
              }}
            >
              <BusinessCenter sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                color: 'text.primary',
                fontSize: '1.25rem',
              }}
            >
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                ChairShare
              </Link>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              sx={{ 
                color: 'text.primary',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.04)',
                },
              }}
              component={Link} 
              to="/listings"
            >
              Find Spaces
            </Button>

            {isAuthenticated ? (
              <>
                {user?.userType === 'HOST' && (
                  <Button 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.04)',
                      },
                    }}
                    component={Link} 
                    to="/create-listing"
                  >
                    List Space
                  </Button>
                )}
                <Button 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.04)',
                    },
                  }}
                  component={Link} 
                  to="/bookings"
                >
                  Bookings
                </Button>
                <Button 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.04)',
                    },
                  }}
                  component={Link} 
                  to="/dashboard"
                >
                  Dashboard
                </Button>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  sx={{ 
                    ml: 1,
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                >
                  {user?.avatar ? (
                    <Avatar 
                      src={user.avatar} 
                      alt={user.firstName}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {user?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    mt: 1,
                    '& .MuiPaper-root': {
                      borderRadius: 2,
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem 
                    onClick={() => { navigate('/profile'); handleClose(); }}
                    sx={{ fontWeight: 500, py: 1.5 }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem 
                    onClick={() => { navigate('/dashboard'); handleClose(); }}
                    sx={{ fontWeight: 500, py: 1.5 }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ fontWeight: 500, py: 1.5, color: 'error.main' }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.04)',
                    },
                  }}
                  component={Link} 
                  to="/login"
                >
                  Login
                </Button>
                <Button 
                  variant="contained"
                  component={Link} 
                  to="/register"
                  sx={{
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    fontWeight: 700,
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
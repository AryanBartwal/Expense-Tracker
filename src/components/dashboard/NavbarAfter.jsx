import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Dashboard, 
  AccountBalance, 
  Analytics, 
  Logout, 
  Person,
  Home
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logoLight from '../images/logo-white.png';

const NavbarAfter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/'); // Redirect to landing page
  };

  const handleGoHome = () => {
    navigate('/'); // Go to landing page
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        {/* Logo and Brand */}
        <Box display="flex" alignItems="center" gap={2}>
          <img 
            src={logoLight} 
            alt="Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              filter: 'brightness(0) invert(1)' // Make logo white
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            💰 Expense Tracker
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Go to Landing Page">
            <Button
              startIcon={<Home />}
              onClick={handleGoHome}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              Home
            </Button>
          </Tooltip>

          <Tooltip title="Dashboard Overview">
            <Button
              startIcon={<Dashboard />}
              onClick={() => scrollToSection('dashboard-summary')}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              Summary
            </Button>
          </Tooltip>

          <Tooltip title="Analytics & Charts">
            <Button
              startIcon={<Analytics />}
              onClick={() => scrollToSection('dashboard-charts')}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              Analytics
            </Button>
          </Tooltip>

          <Tooltip title="Transactions">
            <Button
              startIcon={<AccountBalance />}
              onClick={() => scrollToSection('dashboard-transactions')}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              Transactions
            </Button>
          </Tooltip>

          {/* User Profile Menu */}
          <Tooltip title="User Menu">
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35,
                  background: 'linear-gradient(45deg, #fff 30%, rgba(255,255,255,0.8) 90%)',
                  color: '#667eea'
                }}
              >
                <Person />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiPaper-root': {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2,
                mt: 1,
                minWidth: 150
              }
            }}
          >
            <MenuItem onClick={handleGoHome}>
              <Home sx={{ mr: 1 }} />
              Home
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAfter;

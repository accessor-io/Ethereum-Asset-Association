import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Tooltip, Badge, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7, Notifications, AccountCircle, ChevronLeft } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useWeb3React } from '@web3-react/core';
import { useNotifications } from '@/hooks/useNotifications';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import NetworkStatus from '@/components/network/NetworkStatus';
import WalletConnector from '@/components/auth/WalletConnector';
import { shortenAddress } from '@/utils/addressUtils';

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { account } = useWeb3React();
  const { notifications } = useNotifications();
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { name: t('nav.lookup'), path: '/lookup' },
    { name: t('nav.manage'), path: '/manage' },
    { name: t('nav.attestations'), path: '/attestations' },
    { name: t('nav.crossChain'), path: '/cross-chain' },
  ];

  const drawer = (
    <div>
      <IconButton onClick={handleDrawerToggle}>
        <ChevronLeft />
      </IconButton>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.name} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('app.title')}
        </Typography>
        {!isMobile && (
          <>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{ mx: 1 }}
              >
                {item.name}
              </Button>
            ))}
          </>
        )}
        <NetworkStatus />
        {account ? (
          <>
            <Tooltip title={t('notifications.title')}>
              <IconButton color="inherit">
                <Badge badgeContent={notifications.length} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={account}>
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>{t('profile.view')}</MenuItem>
              <MenuItem onClick={handleMenuClose}>{t('profile.settings')}</MenuItem>
              <MenuItem onClick={handleMenuClose}>{t('auth.disconnect')}</MenuItem>
            </Menu>
          </>
        ) : (
          <WalletConnector />
        )}
        <Tooltip title={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Toolbar>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      )}
    </AppBar>
  );
};

export default Navigation;

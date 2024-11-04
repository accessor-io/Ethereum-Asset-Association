import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, Typography, Paper, Tabs, Tab, Button, TextField, 
  Switch, FormControlLabel, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon, 
  Block as BlockIcon, 
  Settings as SettingsIcon, 
  Refresh as RefreshIcon 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@/hooks/useAuth';
import { useAdminActions } from '@/hooks/useAdminActions';
import ActionButton from '@/components/common/ActionButton';

const AdminControls = ({ onAction }) => {
  const theme = useTheme();
  const { user, checkAdminStatus } = useAuth();
  const { addUser, blockUser, updateSettings, refreshCache } = useAdminActions();
  
  const [activeTab, setActiveTab] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });
  const [blockUserAddress, setBlockUserAddress] = useState('');
  const [settings, setSettings] = useState({ maintenanceMode: false, maxUsers: 1000 });

  useEffect(() => {
    const verifyAdmin = async () => {
      const adminStatus = await checkAdminStatus(user.address);
      setIsAdmin(adminStatus);
      setLoading(false);
    };
    verifyAdmin();
  }, [user, checkAdminStatus]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
      onAction('userAdded', newUser);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to add user', severity: 'error' });
    }
  };

  const handleBlockUser = async () => {
    try {
      await blockUser(blockUserAddress);
      setSnackbar({ open: true, message: 'User blocked successfully', severity: 'success' });
      onAction('userBlocked', blockUserAddress);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to block user', severity: 'error' });
    }
  };

  const handleUpdateSettings = async () => {
    try {
      await updateSettings(settings);
      setSnackbar({ open: true, message: 'Settings updated successfully', severity: 'success' });
      onAction('settingsUpdated', settings);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update settings', severity: 'error' });
    }
  };

  const handleRefreshCache = async () => {
    try {
      await refreshCache();
      setSnackbar({ open: true, message: 'Cache refreshed successfully', severity: 'success' });
      onAction('cacheRefreshed');
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to refresh cache', severity: 'error' });
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!isAdmin) {
    return <Typography color="error">You do not have admin privileges.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" gutterBottom>Admin Controls</Typography>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Add User" icon={<PersonAddIcon />} />
        <Tab label="Block User" icon={<BlockIcon />} />
        <Tab label="Settings" icon={<SettingsIcon />} />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <TextField
            label="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            fullWidth
            margin="normal"
          />
          <ActionButton
            onClick={handleAddUser}
            label="Add User"
            startIcon={<PersonAddIcon />}
            fullWidth
          />
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <TextField
            label="User Address to Block"
            value={blockUserAddress}
            onChange={(e) => setBlockUserAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <ActionButton
            onClick={handleBlockUser}
            label="Block User"
            startIcon={<BlockIcon />}
            color="error"
            fullWidth
          />
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              />
            }
            label="Maintenance Mode"
          />
          <TextField
            label="Max Users"
            type="number"
            value={settings.maxUsers}
            onChange={(e) => setSettings({ ...settings, maxUsers: parseInt(e.target.value, 10) })}
            fullWidth
            margin="normal"
          />
          <ActionButton
            onClick={handleUpdateSettings}
            label="Update Settings"
            startIcon={<SettingsIcon />}
            fullWidth
          />
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          onClick={handleRefreshCache}
          startIcon={<RefreshIcon />}
          variant="outlined"
          fullWidth
        >
          Refresh Cache
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

AdminControls.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default AdminControls;

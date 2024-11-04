import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { Button, Typography, Box, Chip, CircularProgress, Snackbar, Alert } from '@mui/material';
import { AccountBalanceWallet as WalletIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { connectToEthereum, getNetworkName } from '@/services/ethereumService';
import { shortenAddress } from '@/utils/addressUtils';

const EthereumLogin = ({ onLogin, onLogout }) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            handleConnection(provider);
          }
        } catch (err) {
          console.error('Failed to check existing connection:', err);
        }
      }
    };
    checkConnection();
  }, []);

  const handleConnection = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      setProvider(provider);
      setAddress(address);
      setNetwork(network);
      onLogin({ provider, address, network });
    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to connect to Ethereum');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!provider) {
      try {
        const newProvider = await connectToEthereum();
        handleConnection(newProvider);
      } catch (err) {
        console.error('Login error:', err);
        setError('Failed to connect to Ethereum');
      }
    }
  };

  const handleLogout = () => {
    setProvider(null);
    setAddress(null);
    setNetwork(null);
    onLogout();
  };

  const handleNetworkChange = async () => {
    if (provider) {
      const network = await provider.getNetwork();
      setNetwork(network);
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
      bgcolor: theme.palette.background.paper,
    }}>
      {loading ? (
        <CircularProgress />
      ) : address ? (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Connected Account:
          </Typography>
          <Chip
            icon={<WalletIcon />}
            label={shortenAddress(address)}
            onDelete={handleLogout}
            color="primary"
            sx={{ mb: 1 }}
          />
          <Typography variant="body2" gutterBottom>
            Network: {getNetworkName(network?.chainId)}
          </Typography>
          <Button
            startIcon={<RefreshIcon />}
            onClick={handleNetworkChange}
            size="small"
          >
            Refresh Network
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          startIcon={<WalletIcon />}
          onClick={handleLogin}
          fullWidth
        >
          Connect to Ethereum
        </Button>
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

EthereumLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default EthereumLogin;
  
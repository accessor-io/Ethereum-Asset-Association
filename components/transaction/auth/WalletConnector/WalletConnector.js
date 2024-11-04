import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button, Typography, Box, Chip } from '@mui/material';
import { AccountBalanceWallet as WalletIcon, Error as ErrorIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { shortenAddress } from '@/utils/addressUtils';

const WalletConnector = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setError(null);
      } catch (err) {
        setError('Failed to connect wallet');
        console.error(err);
      }
    } else {
      setError('Please install MetaMask');
    }
  };

  const fetchBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
  };

  return (
    <Box sx={{ 
      p: 2, 
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
      bgcolor: theme.palette.background.paper,
    }}>
      {error && (
        <Typography color="error" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <ErrorIcon sx={{ mr: 1 }} />
          {error}
        </Typography>
      )}
      
      {!account ? (
        <Button
          variant="contained"
          startIcon={<WalletIcon />}
          onClick={connectWallet}
          fullWidth
        >
          Connect Wallet
        </Button>
      ) : (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Connected Account:
          </Typography>
          <Chip
            icon={<WalletIcon />}
            label={shortenAddress(account)}
            onDelete={disconnectWallet}
            sx={{ mb: 1 }}
          />
          {balance && (
            <Typography variant="body2">
              Balance: {parseFloat(balance).toFixed(4)} ETH
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default WalletConnector;

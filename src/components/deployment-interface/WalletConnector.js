import React from 'react';
import { Button, Text, Box, Heading } from '@chakra-ui/react';
import { ethers } from 'ethers';

function WalletConnector({ walletAddress, setWalletAddress }) {
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg">Wallet Connection</Heading>
      {walletAddress ? (
        <Text>Connected: {walletAddress}</Text>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Box>
  );
}

export default WalletConnector;

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ethers } from 'ethers';

// Create a Context for Web3
const Web3Context = createContext();

// Web3Provider to supply Web3 context to the application.
export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(etherProvider);

        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('User rejected the request:', error);
        }
      } else {
        console.error('No Ethereum provider found. Install MetaMask.');
      }
    };

    initializeProvider();
  }, []);

  // ENS Functions
  const resolveENS = async (ensName) => {
    try {
      const address = await provider.resolveName(ensName);
      return address;
    } catch (error) {
      console.error('Error resolving ENS name:', error);
      return null;
    }
  };

  const registerENS = async (ensName) => {
    // Implement ENS registration logic
    console.log('Registering ENS name:', ensName);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return true;
  };

  const updateENS = async (ensName, newAddress) => {
    // Implement ENS update logic
    console.log('Updating ENS name:', ensName, 'to address:', newAddress);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return true;
  };

  const lockENS = async (ensName) => {
    // Implement ENS locking logic
    console.log('Locking ENS name:', ensName);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return true;
  };

  const transferENS = async (ensName, newOwner) => {
    // Implement ENS transfer logic
    console.log('Transferring ENS name:', ensName, 'to:', newOwner);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return true;
  };

  const getTextRecords = async (ensName) => {
    // Implement logic to fetch text records
    console.log('Fetching text records for:', ensName);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return { email: 'example@example.com', url: 'https://example.com' };
  };

  const setTextRecord = async (ensName, key, value) => {
    // Implement logic to set a text record
    console.log('Setting text record for:', ensName, 'key:', key, 'value:', value);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return true;
  };

  const getAvatar = async (ensName) => {
    // Implement logic to fetch avatar
    console.log('Fetching avatar for:', ensName);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return 'https://example.com/avatar.png';
  };

  const setAvatar = async (ensName, avatarUrl) => {
    // Implement logic to set avatar
    console.log('Setting avatar for:', ensName, 'url:', avatarUrl);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return true;
  };

  const listNames = async () => {
    // Implement logic to list ENS names owned by the account
    console.log('Listing ENS names for account:', account);
    // This is a placeholder. You'll need to implement the actual contract interaction.
    return ['example1.eth', 'example2.eth'];
  };

  return (
    <Web3Context.Provider value={{ 
      provider, 
      account, 
      resolveENS, 
      registerENS, 
      updateENS, 
      lockENS, 
      transferENS,
      getTextRecords,
      setTextRecord,
      getAvatar,
      setAvatar,
      listNames
    }}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom Hook to access Web3 context.
export const useWeb3 = () => {
  return useContext(Web3Context);
};

// Custom Hook for ENS functionalities.
export const useENS = () => {
  const { 
    resolveENS, 
    registerENS, 
    updateENS, 
    lockENS, 
    transferENS,
    getTextRecords,
    setTextRecord,
    getAvatar,
    setAvatar,
    listNames
  } = useWeb3();
  return { 
    resolveENS, 
    registerENS, 
    updateENS, 
    lockENS, 
    transferENS,
    getTextRecords,
    setTextRecord,
    getAvatar,
    setAvatar,
    listNames
  };
};
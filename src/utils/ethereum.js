import { ethers } from 'ethers';
import { NETWORK_NAMES, RPC_URLS, SUPPORTED_CHAINS } from '../config';
import { useWeb3 } from './hooks';

/**
 * Custom Hook to handle chain switching.
 *
 * @returns {Function} Function to switch the Ethereum chain.
 */
export const useSwitchChain = () => {
  const { provider } = useWeb3();

  /**
   * Switches the Ethereum chain to the specified chain ID.
   *
   * @param {number} chainId - The target chain ID (e.g., 1 for Mainnet).
   */
  const switchChain = async (chainId) => {
    if (!provider) {
      console.error('Ethereum provider is not available.');
      return;
    }

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }]);
      console.log(`Switched to chain ${chainId}`);
    } catch (error) {
      if (error.code === 4902) {
        console.error('This chain is not added to your wallet.');
        // Optionally, prompt to add the chain
      } else {
        console.error('Failed to switch chain:', error);
      }
    }
  };

  return switchChain;
};

export const getENS = (chainId = 1) => {
  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID`);
  return provider;
};

export const getSigner = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  }
  throw new Error('No Ethereum wallet found');
};

export const getGasPrice = async (provider) => {
  const gasPrice = await provider.getGasPrice();
  return gasPrice;
}

export const estimateGas = async (transaction, provider) => {
  const estimatedGas = await provider.estimateGas(transaction);
  return estimatedGas;
}

/**
 * Switches the Ethereum chain to the specified chain ID.
 *
 * @param {Object} provider - The Ethereum provider (e.g., ethers provider).
 * @param {number} chainId - The target chain ID (e.g., 1 for Mainnet).
 */
export const switchChain = async (provider, chainId) => {
  if (!provider) {
    console.error('Ethereum provider is not available.');
    return;
  }

  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }]);
    console.log(`Switched to chain ${chainId}`);
  } catch (error) {
    if (error.code === 4902) {
      console.error('This chain is not added to your wallet.');
      // Optionally, prompt to add the chain
    } else {
      console.error('Failed to switch chain:', error);
    }
  }
};

// Define the getProvider function
export const getProvider = () => {
  // Example implementation using ethers.js
  if (window.ethereum) {
    const { ethers } = require('ethers'); // Ensure ethers is imported
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  throw new Error('No Ethereum provider found');
};

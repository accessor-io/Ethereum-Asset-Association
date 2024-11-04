import { ethers } from 'ethers';

export const initializeWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      console.log('Web3 initialized successfully');
      return { provider, signer };
    } catch (error) {
      console.error('Failed to initialize Web3:', error);
      throw error;
    }
  } else {
    throw new Error('No Ethereum wallet detected');
  }
};

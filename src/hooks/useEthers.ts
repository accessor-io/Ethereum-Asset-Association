import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useEthers() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(ethersProvider);
  }, []);

  return { provider };
}
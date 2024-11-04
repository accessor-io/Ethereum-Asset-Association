import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NETWORK_NAMES } from '../config';

const NetworkStatus = () => {
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const updateNetwork = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      setNetwork(network);
    };

    updateNetwork();
    window.ethereum.on('chainChanged', updateNetwork);

    return () => {
      window.ethereum.removeListener('chainChanged', updateNetwork);
    };
  }, []);

  if (!network) return null;

  return (
    <div>
      Current Network: {NETWORK_NAMES[network.chainId] || 'Unknown'}
    </div>
  );
};

export default NetworkStatus;
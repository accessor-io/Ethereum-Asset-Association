import React from 'react';
import { connectToEthereum } from '../services/ethereumService';

const EthereumLogin = ({ provider, setProvider, setAddress }) => {
  const handleLogin = async () => {
    if (!provider) {
      const newProvider = await connectToEthereum();
      setProvider(newProvider);
      const signer = newProvider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>
        {provider ? 'Connected' : 'Connect to Ethereu '}
      </button>
    </div>
  );
};

export default EthereumLogin;
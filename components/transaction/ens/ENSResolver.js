import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../utils/ethereum';
import './common.css'; // Importing common CSS for uniformity

function ENSResolver() {
  const [ensName, setEnsName] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState('');

  const resolveName = async () => {
    try {
      const provider = await getProvider();
      const address = await provider.resolveName(ensName);
      setResolvedAddress(address || 'Not resolved');
    } catch (error) {
      console.error('Error resolving ENS name:', error);
      setResolvedAddress('Error resolving name');
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>ENS Resolver</h2>
      <input
        type="text"
        value={ensName}
        onChange={(e) => setEnsName(e.target.value)}
        placeholder="Enter ENS name"
        style={{ margin: '10px 0', padding: '5px' }}
      />
      <button onClick={resolveName} style={{ padding: '5px 10px' }}>Resolve Name</button>
      <p>Resolved Address: {resolvedAddress}</p>
    </div>
  );
}

export default ENSResolver;

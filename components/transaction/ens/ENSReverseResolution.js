import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../utils/ethereum';
import './common.css'; // Importing common CSS for uniformity

function ENSReverseResolution() {
  const [address, setAddress] = useState('');
  const [ensName, setEnsName] = useState('');

  const lookupAddress = async () => {
    try {
      const provider = await getProvider();
      const name = await provider.lookupAddress(address);
      setEnsName(name || 'No ENS name found');
    } catch (error) {
      console.error('Error looking up address:', error);
      setEnsName('Error looking up address');
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>ENS Reverse Resolution</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address"
        style={{ margin: '10px 0', padding: '5px', width: '300px' }}
      />
      <button onClick={lookupAddress} style={{ padding: '5px 10px' }}>Lookup Address</button>
      <p>ENS Name: {ensName}</p>
    </div>
  );
}

export default ENSReverseResolution;

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useWeb3 } from '../../contexts/Web3Context';

function ReverseLookupComponent() {
  const [address, setAddress] = useState('');
  const [ensName, setEnsName] = useState<string | null>(null);
  const { provider } = useWeb3();

  const handleLookup = async () => {
    try {
      if (!ethers.utils.isAddress(address)) {
        toast.error('Invalid Ethereum address');
        return;
      }
      const name = await provider.lookupAddress(address);
      if (name) {
        setEnsName(name);
        toast.success('Reverse lookup successful');
      } else {
        setEnsName(null);
        toast.info('No ENS name found for this address');
      }
    } catch (error) {
      console.error('Error in reverse lookup:', error);
      toast.error('Error in reverse lookup');
    }
  };

  return (
    <div>
      <h2>ENS Reverse Lookup</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address"
      />
      <button onClick={handleLookup}>Lookup</button>
      {ensName && <p>ENS Name: {ensName}</p>}
    </div>
  );
}

export default ReverseLookupComponent;
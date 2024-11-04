import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useWeb3 } from '../../contexts/Web3Context';

function ENSResolver() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { provider } = useWeb3();

  const handleResolve = async () => {
    try {
      if (!provider) throw new Error("Provider not available");
      let resolvedAddress;
      if (ethers.utils.isAddress(input)) {
        // If input is an Ethereum address, perform reverse lookup
        resolvedAddress = await provider.lookupAddress(input);
      } else {
        // If input is an ENS name, resolve to address
        resolvedAddress = await provider.resolveName(input);
      }

      if (resolvedAddress) {
        setResult(resolvedAddress);
        toast.success('Resolution successful');
      } else {
        setResult(null);
        toast.info('No resolution found');
      }
    } catch (error) {
      console.error('Error in ENS resolution:', error);
      toast.error('Error in ENS resolution');
    }
  };

  return (
    <div>
      <h2>ENS Resolver</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ENS name or Ethereum address"
      />
      <button onClick={handleResolve}>Resolve</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default ENSResolver;
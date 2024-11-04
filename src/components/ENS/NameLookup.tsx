import React, { useState } from 'react';
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { normalize } from '@ensdomains/eth-ens-namehash';

function NameLookupComponent() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const provider = useProvider();

  const handleLookup = async () => {
    try {
      const name = normalize(input);
      const resolver = await provider.getResolver(name);
      if (!resolver) {
        toast.error('No resolver found for this name');
        return;
      }

      const records: any = {};

      // Fetch address
      const address = await resolver.getAddress();
      if (address) records.address = address;

      // Fetch text records
      const textKeys = ['email', 'url', 'avatar', 'description', 'notice', 'keywords', 'com.discord', 'com.github', 'com.reddit', 'com.twitter', 'org.telegram'];
      for (const key of textKeys) {
        const value = await resolver.getText(key);
        if (value) records[key] = value;
      }

      // Fetch content hash
      const contentHash = await resolver.getContentHash();
      if (contentHash) records.contentHash = contentHash;

      // Fetch addresses for different coins
      const coinTypes = [60, 0, 2, 3, 501]; // ETH, BTC, LTC, DOGE, SOL
      for (const coinType of coinTypes) {
        const address = await resolver.getAddress(coinType);
        if (address) records[`coin_${coinType}`] = address;
      }

      setResult(records);
      toast.success('Name lookup successful');
    } catch (error) {
      console.error('Error in name lookup:', error);
      toast.error('Error in name lookup');
    }
  };

  return (
    <div>
      <h2>ENS Name Lookup</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ENS name"
      />
      <button onClick={handleLookup}>Lookup</button>
      {result && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default NameLookupComponent;
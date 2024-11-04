import React, { useState } from 'react';
import { useProvider, useContract } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { normalize } from '@ensdomains/eth-ens-namehash';
import AttestationRegistryABI from '../../abis/AttestationRegistry.json';

function AssociatedAssetsComponent() {
  const [input, setInput] = useState('');
  const [assets, setAssets] = useState<any>(null);
  const provider = useProvider();
  
  const attestationRegistryContract = useContract({
    address: 'YOUR_ATTESTATION_REGISTRY_ADDRESS',
    abi: AttestationRegistryABI,
    signerOrProvider: provider,
  });

  const handleLookup = async () => {
    setAssets(null);
    try {
      if (ethers.utils.isAddress(input)) {
        await lookupByAddress(input);
      } else {
        await lookupByName(input);
      }
    } catch (error) {
      console.error('Error in lookup:', error);
      toast.error('Error performing lookup');
    }
  };

  const lookupByAddress = async (address: string) => {
    const name = await provider.lookupAddress(address);
    if (name) {
      await lookupByName(name);
    } else {
      setAssets({ address, ensName: null, message: 'No ENS name found for this address' });
      toast.info('No ENS name found for this address');
    }
  };

  const lookupByName = async (name: string) => {
    const normalizedName = normalize(name);
    const address = await provider.resolveName(normalizedName);
    if (address) {
      const resolver = await provider.getResolver(normalizedName);
      if (resolver) {
        const records = await fetchRecords(resolver, normalizedName);
        const attestations = await fetchAttestations(normalizedName);
        setAssets({ 
          ensName: normalizedName, 
          address, 
          records, 
          attestations,
        });
        toast.success('Assets retrieved successfully');
      } else {
        setAssets({ ensName: normalizedName, address, message: 'No resolver found for this name' });
        toast.info('No resolver found for this name');
      }
    } else {
      setAssets({ ensName: normalizedName, address: null, message: 'ENS name not found' });
      toast.info('ENS name not found');
    }
  };

  const fetchRecords = async (resolver: ethers.providers.Resolver, name: string) => {
    const records: any = {};
    const namehash = ethers.utils.namehash(name);

    const textKeys = ['email', 'url', 'avatar', 'description', 'notice', 'keywords', 'com.discord', 'com.github', 'com.reddit', 'com.twitter', 'org.telegram'];
    for (const key of textKeys) {
      const value = await resolver.getText(namehash, key);
      if (value) records[key] = value;
    }

    const contentHash = await resolver.getContentHash(namehash);
    if (contentHash) records.contentHash = contentHash;

    const coinTypes = [60, 0, 2, 3, 501]; // ETH, BTC, LTC, DOGE, SOL
    for (const coinType of coinTypes) {
      try {
        const addr = await resolver.getAddress(coinType);
        if (addr) records[`address_${coinType}`] = addr;
      } catch (error) {
        console.error(`Error fetching address for coin type ${coinType}:`, error);
      }
    }

    return records;
  };

  const fetchAttestations = async (name: string) => {
    if (!attestationRegistryContract) {
      toast.error('Attestation Registry contract not initialized');
      return [];
    }

    try {
      const attestationUIDs = await attestationRegistryContract.getAttestationsForENS(ethers.utils.namehash(name));
      return attestationUIDs;
    } catch (error) {
      console.error('Error retrieving attestations:', error);
      toast.error('Failed to retrieve attestations');
      return [];
    }
  };

  return (
    <div>
      <h2>Associated Assets</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ENS name or Ethereum address"
      />
      <button onClick={handleLookup}>Lookup Associated Assets</button>
      {assets && (
        <div>
          <h3>Associated Assets:</h3>
          {assets.message ? (
            <p>{assets.message}</p>
          ) : (
            <div>
              <p><strong>ENS Name:</strong> {assets.ensName}</p>
              <p><strong>Ethereum Address:</strong> {assets.address}</p>
              
              {assets.records && Object.keys(assets.records).length > 0 && (
                <div>
                  <h4>ENS Records:</h4>
                  <ul>
                    {Object.entries(assets.records).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value as string}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {assets.attestations && assets.attestations.length > 0 && (
                <div>
                  <h4>Attestations:</h4>
                  <ul>
                    {assets.attestations.map((uid: string, index: number) => (
                      <li key={index}>Attestation UID: {uid}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AssociatedAssetsComponent;
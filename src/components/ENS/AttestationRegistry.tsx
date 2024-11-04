import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import AttestationRegistryABI from '../../abis/AttestationRegistry.json';

function AttestationRegistryComponent() {
  const [ensName, setEnsName] = useState('');
  const [attestations, setAttestations] = useState<string[]>([]);

  const { data: signer } = useSigner();
  const contract = useContract({
    address: 'YOUR_ATTESTATION_REGISTRY_ADDRESS',
    abi: AttestationRegistryABI,
    signerOrProvider: signer,
  });

  const handleGetAttestations = async () => {
    if (!contract) {
      toast.error('Contract not initialized');
      return;
    }

    try {
      const attestationUIDs = await contract.getAttestationsForENS(ethers.utils.namehash(ensName));
      setAttestations(attestationUIDs);
      toast.success('Attestations retrieved successfully');
    } catch (error) {
      console.error('Error retrieving attestations:', error);
      toast.error('Failed to retrieve attestations. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Attestation Registry</h2>
      <input
        type="text"
        value={ensName}
        onChange={(e) => setEnsName(e.target.value)}
        placeholder="ENS Name"
      />
      <button onClick={handleGetAttestations}>Get Attestations</button>
      {attestations.length > 0 && (
        <div>
          <h3>Attestations for {ensName}:</h3>
          <ul>
            {attestations.map((uid, index) => (
              <li key={index}>{uid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AttestationRegistryComponent;
import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import AttestationServiceABI from '../../abis/AttestationService.json';

function AddAttestationComponent() {
  const [owner, setOwner] = useState('');
  const [ensName, setEnsName] = useState('');
  const [entityData, setEntityData] = useState('');
  
  const { data: signer } = useSigner();
  const contract = useContract({
    address: '0x...', // Replace with your contract address
    abi: AttestationServiceABI,
    signerOrProvider: signer,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract) {
      toast.error('Contract not initialized');
      return;
    }

    try {
      const tx = await contract.addAttestation(owner, ensName, ethers.utils.toUtf8Bytes(entityData));
      toast.info('Transaction sent. Waiting for confirmation...');
      await tx.wait();
      toast.success('Attestation added successfully');
    } catch (error) {
      console.error('Error adding attestation:', error);
      toast.error('Failed to add attestation. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Owner address"
      />
      <input
        type="text"
        value={ensName}
        onChange={(e) => setEnsName(e.target.value)}
        placeholder="ENS Name"
      />
      <input
        type="text"
        value={entityData}
        onChange={(e) => setEntityData(e.target.value)}
        placeholder="Entity Data"
      />
      <button type="submit">Add Attestation</button>
    </form>
  );
}

export default AddAttestationComponent;
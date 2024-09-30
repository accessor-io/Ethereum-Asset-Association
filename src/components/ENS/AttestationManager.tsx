import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import AttestationManagerABI from '../../abis/AttestationManager.json';

function AttestationManagerComponent() {
  const [ensName, setEnsName] = useState('');
  const [attestationUID, setAttestationUID] = useState('');

  const { data: signer } = useSigner();
  const contract = useContract({
    address: 'YOUR_ATTESTATION_MANAGER_ADDRESS',
    abi: AttestationManagerABI,
    signerOrProvider: signer,
  });

  const handleAssociateAttestation = async () => {
    if (!contract) {
      toast.error('Contract not initialized');
      return;
    }

    try {
      const tx = await contract.associateAttestationWithENS(
        ethers.utils.namehash(ensName),
        attestationUID
      );
      toast.info('Association transaction sent. Waiting for confirmation...');
      await tx.wait();
      toast.success('Attestation associated with ENS name successfully');
    } catch (error) {
      console.error('Error associating attestation:', error);
      toast.error('Failed to associate attestation. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Associate Attestation with ENS</h2>
      <input
        type="text"
        value={ensName}
        onChange={(e) => setEnsName(e.target.value)}
        placeholder="ENS Name"
      />
      <input
        type="text"
        value={attestationUID}
        onChange={(e) => setAttestationUID(e.target.value)}
        placeholder="Attestation UID"
      />
      <button onClick={handleAssociateAttestation}>Associate Attestation</button>
    </div>
  );
}

export default AttestationManagerComponent;
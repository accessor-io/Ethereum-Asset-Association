import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';

function RemoveAttestationComponent() {
  const [owner, setOwner] = useState('');
  const contract = useContract('AttestationService');

  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract) return;

    try {
      const tx = await contract.removeAttestation(owner);
      await tx.wait();
      console.log('Attestation removed successfully');
    } catch (error) {
      console.error('Error removing attestation:', error);
    }
  };

  return (
    <form onSubmit={handleRemove}>
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Owner address"
      />
      <button type="submit">Remove Attestation</button>
    </form>
  );
}

export default RemoveAttestationComponent;
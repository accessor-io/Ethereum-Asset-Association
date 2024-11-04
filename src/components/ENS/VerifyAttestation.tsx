import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';

function VerifyAttestationComponent() {
  const [owner, setOwner] = useState('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  
  const contract = useContract('AttestationService');

  const handleVerify = async () => {
    if (!contract) return;

    try {
      const result = await contract.verifyAttestation(owner);
      setIsVerified(result);
    } catch (error) {
      console.error('Error verifying attestation:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Owner address"
      />
      <button onClick={handleVerify}>Verify Attestation</button>
      {isVerified !== null && (
        <p>Attestation is {isVerified ? 'verified' : 'not verified'}</p>
      )}
    </div>
  );
}

export default VerifyAttestationComponent;
import { useState } from 'react';

export const AttestationManager = () => {
  const [attestation, setAttestation] = useState('');

  return (
    <div>
      <input
        type="text"
        value={attestation}
        onChange={(e) => setAttestation(e.target.value)}
      />
      <button>Create Attestation</button>
    </div>
  );
}; 
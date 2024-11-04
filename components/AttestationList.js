import { useEffect, useState } from 'react';

export const AttestationList = ({ address }) => {
  const [attestations, setAttestations] = useState([]);

  useEffect(() => {
    // Fetch attestations logic here
  }, [address]);

  return (
    <div>
      {attestations.map((attestation) => (
        <div key={attestation.id}>{/* Attestation details */}</div>
      ))}
    </div>
  );
}; 
import React, { useState } from 'react';
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { getProvider } from '../utils/ethereum';
import './common.css'; // Importing common CSS for uniformity

const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26 address

function EASVerification() {
  const [uid, setUid] = useState('');
  const [attestation, setAttestation] = useState(null);

  const verifyAttestation = async () => {
    try {
      const provider = await getProvider();
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(provider);

      const fetchedAttestation = await eas.getAttestation(uid);
      setAttestation(fetchedAttestation);
    } catch (error) {
      console.error("Error verifying attestation:", error);
    }
  };

  // ... render JSX with input for UID and button to call verifyAttestation
}

export default EASVerification;

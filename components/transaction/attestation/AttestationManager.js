import React, { useState } from 'react';
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { getSigner } from '../utils/ethereum';
import './common.css'; // Importing common CSS for uniformity

const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26 address

function AttestationManager() {
  const [attestationUID, setAttestationUID] = useState('');

  const revokeAttestation = async () => {
    try {
      const signer = await getSigner();
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(signer);

      const tx = await eas.revoke({
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000",
        dataa: { uid: attestationUID },
      });

      await tx.wait();
      console.log("Attestation revoked:", attestationUID);
    } catch (error) {
      console.error("Error revoking attestation:", error);
    }
  };

  // ... render JSX with input for attestationUID and button to call revokeAttestation
}

export default AttestationManager;

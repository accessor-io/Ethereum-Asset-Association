import React, { useState } from 'react';
import { ethers } from 'ethers';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { getProvider, getSigner } from '../utils/ethereum';

const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26 address

function EASAttestation() {
  const [schema, setSchema] = useState('');
  const [recipient, setRecipient] = useState('');
  const [data, setData] = useState('');
  const [attestationUID, setAttestationUID] = useState('');

  const createAttestation = async () => {
    try {
      const signer = await getSigner();
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(signer);

      const schemaEncoder = new SchemaEncoder(schema);
      const encodedData = schemaEncoder.encodeData([
        { name: "data", value: data, type: "string" },
      ]);

      const tx = await eas.attest({
        schema: schema,
        data: {
          recipient: recipient,
          expirationTime: 0,
          revocable: true,
          data: encodedData,
        },
      });

      const newAttestationUID = await tx.wait();
      setAttestationUID(newAttestationUID);
      console.log("New attestation UID:", newAttestationUID);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  // ... render JSX with form inputs and button to call createAttestation
}

export default EASAttestation;

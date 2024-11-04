import React, { useState } from 'react';
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { getSigner } from '../utils/ethereum';
import './common.css'; // Importing common CSS for uniformity

const SCHEMA_REGISTRY_ADDRESS = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia v0.26

function SchemaManager() {
  const [schema, setSchema] = useState('');
  const [schemaUID, setSchemaUID] = useState('');

  const registerSchema = async () => {
    try {
      const signer = await getSigner();
      const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_ADDRESS);
      schemaRegistry.connect(signer);

      const transaction = await schemaRegistry.register({
        schema,
        revocable: true,
      });

      const receipt = await transaction.wait();
      setSchemaUID(receipt.logs[0].topics[1]); // This assumes the UID is emitted in the first event's second topic
      console.log("New Schema UID:", schemaUID);
    } catch (error) {
      console.error("Error registering schema:", error);
    }
  };

  // ... render JSX with input for schema and button to call registerSchema
}

export default SchemaManager;

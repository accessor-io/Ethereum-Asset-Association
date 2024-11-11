import { useState, useCallback, useEffect } from 'react';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';

export const useEAS = (easContractAddress) => {
  const [eas, setEas] = useState(null);
  
  // Initialize EAS
  useEffect(() => {
    if (easContractAddress) {
      const easInstance = new EAS(easContractAddress);
      setEas(easInstance);
    }
  }, [easContractAddress]);

  // Get attestations for an address
  const getAttestationsForAddress = useCallback(async (address) => {
    if (!eas || !address) return null;

    const query = `
      query GetAttestations($address: String!) {
        attestations(where: { attester: $address }) {
          id
          attester
          recipient
          refUID
          revocationTime
          expirationTime
          data
        }
      }
    `;

    try {
      const response = await fetch('https://sepolia.easscan.org/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { address: address.toLowerCase() }
        })
      });

      const data = await response.json();
      return data.data.attestations;
    } catch (error) {
      console.error('Failed to fetch attestations:', error);
      throw error;
    }
  }, [eas]);

  // Create an attestation
  const createAttestation = useCallback(async ({
    schema,
    recipient,
    data,
    expirationTime = 0,
    revocable = true
  }) => {
    if (!eas) throw new Error('EAS not initialized');

    const schemaEncoder = new SchemaEncoder(schema);
    const encodedData = schemaEncoder.encodeData(data);

    try {
      const tx = await eas.attest({
        schema,
        data: {
          recipient,
          expirationTime,
          revocable,
          data: encodedData
        }
      });

      return await tx.wait();
    } catch (error) {
      console.error('Failed to create attestation:', error);
      throw error;
    }
  }, [eas]);

  // Revoke an attestation
  const revokeAttestation = useCallback(async (uid) => {
    if (!eas) throw new Error('EAS not initialized');

    try {
      const tx = await eas.revoke({
        schema: uid
      });

      return await tx.wait();
    } catch (error) {
      console.error('Failed to revoke attestation:', error);
      throw error;
    }
  }, [eas]);

  return {
    eas,
    getAttestationsForAddress,
    createAttestation,
    revokeAttestation
  };
}; 
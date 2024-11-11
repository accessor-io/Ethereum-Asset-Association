import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import { getENS, getSigner } from './ethereum';
import { CONTRACT_ADDRESSES } from '../config';

const EAS_SCHEMA_UID = '0x0000000000000000000000000000000000000000000000000000000000000000'; // Replace with your actual schema UID

export const createENSAttestation = async (ensName, attestationData, chainId) => {
  const signer = await getSigner();
  const eas = new EAS(CONTRACT_ADDRESSES[chainId].EAS);
  eas.connect(signer);

  const schemaEncoder = new SchemaEncoder("string data");
  const encodedData = schemaEncoder.encodeData([
    { name: "data", value: attestationData, type: "string" }
  ]);

  const tx = await eas.attest({
    schema: EAS_SCHEMA_UID,
    data: {
      recipient: await signer.getAddress(),
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  // Store attestation UID in ENS text record
  const provider = getENS(chainId);
  const resolver = await provider.getResolver(ensName);
  await resolver.setText('eas-attestation', newAttestationUID);

  return newAttestationUID;
};

export const getENSAttestation = async (ensName, chainId) => {
  const provider = getENS(chainId);
  const resolver = await provider.getResolver(ensName);
  const attestationUID = await resolver.getText('eas-attestation');

  if (!attestationUID) {
    return null;
  }

  const eas = new EAS(CONTRACT_ADDRESSES[chainId].EAS);
  eas.connect(provider);

  const attestation = await eas.getAttestation(attestationUID);
  return attestation;
};
import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import AttestationServiceABI from '../../abis/AttestationService.json';

function AttestationServiceComponent() {
  const [schema, setSchema] = useState('');
  const [recipient, setRecipient] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [revocable, setRevocable] = useState(true);
  const [refUID, setRefUID] = useState('');
  const [data, setData] = useState('');

  const { data: signer } = useSigner();
  const contract = useContract({
    address: 'YOUR_ATTESTATION_SERVICE_ADDRESS',
    abi: AttestationServiceABI,
    signerOrProvider: signer,
  });

  const handleAttest = async () => {
    if (!contract) {
      toast.error('Contract not initialized');
      return;
    }

    try {
      const tx = await contract.attest({
        schema: ethers.utils.id(schema),
        data: {
          recipient,
          expirationTime: ethers.BigNumber.from(expirationTime),
          revocable,
          refUID: ethers.utils.hexZeroPad(refUID, 32),
          data: ethers.utils.toUtf8Bytes(data),
        },
      });
      toast.info('Attestation transaction sent. Waiting for confirmation...');
      await tx.wait();
      toast.success('Attestation created successfully');
    } catch (error) {
      console.error('Error creating attestation:', error);
      toast.error('Failed to create attestation. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Create Attestation</h2>
      <input
        type="text"
        value={schema}
        onChange={(e) => setSchema(e.target.value)}
        placeholder="Schema"
      />
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="number"
        value={expirationTime}
        onChange={(e) => setExpirationTime(e.target.value)}
        placeholder="Expiration Time (Unix Timestamp)"
      />
      <label>
        Revocable:
        <input
          type="checkbox"
          checked={revocable}
          onChange={(e) => setRevocable(e.target.checked)}
        />
      </label>
      <input
        type="text"
        value={refUID}
        onChange={(e) => setRefUID(e.target.value)}
        placeholder="Reference UID"
      />
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Attestation Data"
      />
      <button onClick={handleAttest}>Create Attestation</button>
    </div>
  );
}

export default AttestationServiceComponent;
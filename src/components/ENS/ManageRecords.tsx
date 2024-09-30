import React, { useState } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

function ManageRecordsComponent() {
  const [ensName, setEnsName] = useState('');
  const [recordKey, setRecordKey] = useState('');
  const [recordValue, setRecordValue] = useState('');
  const provider = useProvider();
  const { data: signer } = useSigner();

  const handleSetRecord = async () => {
    if (!signer) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      const resolver = await provider.getResolver(ensName);
      if (!resolver) {
        toast.error('No resolver found for this name');
        return;
      }

      const resolverWithSigner = resolver.connect(signer);
      await resolverWithSigner.setText(recordKey, recordValue);
      toast.success('Record set successfully');
    } catch (error) {
      console.error('Error setting record:', error);
      toast.error('Error setting record');
    }
  };

  return (
    <div>
      <h2>Manage ENS Records</h2>
      <input
        type="text"
        value={ensName}
        onChange={(e) => setEnsName(e.target.value)}
        placeholder="Enter ENS name"
      />
      <input
        type="text"
        value={recordKey}
        onChange={(e) => setRecordKey(e.target.value)}
        placeholder="Enter record key"
      />
      <input
        type="text"
        value={recordValue}
        onChange={(e) => setRecordValue(e.target.value)}
        placeholder="Enter record value"
      />
      <button onClick={handleSetRecord}>Set Record</button>
    </div>
  );
}

export default ManageRecordsComponent;
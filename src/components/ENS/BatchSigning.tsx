import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import { toast } from 'react-toastify';
import styles from '../../styles/ENS.module.css';

function BatchSigningComponent() {
  const [owners, setOwners] = useState<string[]>([]);
  const [newOwner, setNewOwner] = useState('');
  const contract = useContract('AttestationService');

  const addOwner = () => {
    if (newOwner) {
      setOwners([...owners, newOwner]);
      setNewOwner('');
    }
  };

  const handleBatchSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || owners.length === 0) {
      toast.error('Contract not initialized or no owners added');
      return;
    }

    try {
      const tx = await contract.signBatch(owners);
      toast.info('Transaction sent. Waiting for confirmation...');
      await tx.wait();
      toast.success('Batch signed successfully');
    } catch (error) {
      console.error('Error signing batch:', error);
      toast.error('Failed to sign batch. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleBatchSign} className={styles.form}>
      <div>
        <input
          type="text"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          placeholder="Owner address"
        />
        <button type="button" onClick={addOwner}>Add Owner</button>
      </div>
      <ul>
        {owners.map((owner, index) => (
          <li key={index}>{owner}</li>
        ))}
      </ul>
      <button type="submit">Sign Batch</button>
    </form>
  );
}

export default BatchSigningComponent;
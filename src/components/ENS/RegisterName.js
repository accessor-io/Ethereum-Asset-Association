import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { ethRegistrarControllerABI } from '@ensdomains/ens-contracts';

function RegisterName() {
  const [name, setName] = useState('');
  const { address } = useAccount();
  const { write: commit } = useContractWrite({
    address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
    abi: ethRegistrarControllerABI,
    functionName: 'commit',
  });
  const { write: register } = useContractWrite({
    address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
    abi: ethRegistrarControllerABI,
    functionName: 'register',
  });

  const handleCommit = () => {
    // Implement commitment logic
  };

  const handleRegister = () => {
    // Implement registration logic
  };

  return (
    <div>
      <h2>Register Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name to register"
      />
      <button onClick={handleCommit}>Commit</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterName;

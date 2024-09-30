import React, { useState } from 'react';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';

function NameLookup() {
  const [name, setName] = useState('');
  const { data: address } = useEnsAddress({ name });
  const { data: avatar } = useEnsAvatar({ name });
  const { data: reverseName } = useEnsName({ address: address });

  return (
    <div>
      <h2>Name Lookup</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter ENS name"
      />
      {address && (
        <div>
          <p>Address: {address}</p>
          {avatar && <img src={avatar} alt="Avatar" />}
          {reverseName && <p>Reverse Name: {reverseName}</p>}
        </div>
      )}
    </div>
  );
}

export default NameLookup;

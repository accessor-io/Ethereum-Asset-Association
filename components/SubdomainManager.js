import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getSigner } from '../utils/ethereum';
import { ENS_REGISTRY_ADDRESS } from '../constants';

function SubdomainManager() {
  const [domain, setDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [owner, setOwner] = useState('');

  const createSubdomain = async () => {
    try {
      const signer = await getSigner();
      const registry = new ethers.Contract(ENS_REGISTRY_ADDRESS, ['function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl)'], signer);
      
      const node = ethers.utils.namehash(domain);
      const label = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(subdomain));
      const tx = await registry.setSubnodeRecord(node, label, owner, ethers.constants.AddressZero, 0);
      await tx.wait();
      console.log(`Subdomain ${subdomain}.${domain} created and assigned to ${owner}`);
    } catch (error) {
      console.error('Error creating subdomain:', error);
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Subdomain Manager</h2>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter parent domain"
        style={{ margin: '10px 0', padding: '5px', display: 'block' }}
      />
      <input
        type="text"
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
        placeholder="Enter subdomain"
        style={{ margin: '10px 0', padding: '5px', display: 'block' }}
      />
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Enter owner address"
        style={{ margin: '10px 0', padding: '5px', display: 'block', width: '300px' }}
      />
      <button onClick={createSubdomain} style={{ padding: '5px 10px' }}>Create Subdomain</button>
    </div>
  );
}

export default SubdomainManager;

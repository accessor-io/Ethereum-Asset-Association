import React from 'react';
import { Select, Box, Heading } from '@chakra-ui/react';

function NetworkSelector({ network, setNetwork }) {
  const networks = ['Mainnet', 'Goerli', 'Sepolia'];

  return (
    <Box>
      <Heading as="h2" size="lg">Network Selection</Heading>
      <Select 
        placeholder="Select network" 
        value={network} 
        onChange={(e) => setNetwork(e.target.value)}
      >
        {networks.map(net => (
          <option key={net} value={net}>{net}</option>
        ))}
      </Select>
    </Box>
  );
}

export default NetworkSelector;

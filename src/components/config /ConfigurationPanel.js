import React from 'react';
import { Box, Heading, VStack, Input, Button } from '@chakra-ui/react';

function ConfigurationPanel({ config, setConfig }) {
  return (
    <Box>
      <Heading as="h2" size="lg">Configuration</Heading>
      <VStack spacing={4} align="stretch">
        <Input 
          placeholder="Gas Price (Gwei)" 
          value={config.gasPrice || ''}
          onChange={(e) => setConfig({...config, gasPrice: e.target.value})}
        />
        <Input 
          placeholder="Gas Limit" 
          value={config.gasLimit || ''}
          onChange={(e) => setConfig({...config, gasLimit: e.target.value})}
        />
        <Button>Save Configuration</Button>
        <Button>Load Configuration</Button>
      </VStack>
    </Box>
  );
}

export default ConfigurationPanel;

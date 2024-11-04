import React from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';

function BatchDeployment({ selectedFiles, network, walletAddress }) {
  return (
    <Box>
      <Heading as="h2" size="lg">Batch Deployment</Heading>
      <VStack spacing={4} align="stretch">
        <Text>Selected Files for Batch Deployment:</Text>
        {selectedFiles.map((file, index) => (
          <Text key={index}>{file}</Text>
        ))}
        <Button>Start Batch Deployment</Button>
      </VStack>
    </Box>
  );
}

export default BatchDeployment;

import React from 'react';
import { Box, Heading, VStack, Text, Button, Input } from '@chakra-ui/react';

function DeploymentInterface({ selectedFiles, network, walletAddress }) {
  return (
    <Box>
      <Heading as="h2" size="lg">Deployment Interface</Heading>
      <VStack spacing={4} align="stretch">
        {selectedFiles.map((file, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="md">
            <Text fontWeight="bold">{file}</Text>
            <Text>Summary of what this script/contract does...</Text>
            <Input placeholder="Constructor parameters (if applicable)" />
            <Text>Estimated gas cost: ...</Text>
            <Button mt={2}>Deploy</Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default DeploymentInterface;

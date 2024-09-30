import React from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';

function PostDeployment({ deploymentStatus }) {
  return (
    <Box>
      <Heading as="h2" size="lg">Post Deployment</Heading>
      <VStack spacing={4} align="stretch">
        {Object.entries(deploymentStatus).map(([file, status]) => (
          <Box key={file} borderWidth={1} p={4} borderRadius="md">
            <Text fontWeight="bold">{file}</Text>
            <Text>Deployed Address: {status.deployedAddress}</Text>
            <Button>Interact with Contract</Button>
            <Button>Verify on Etherscan</Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default PostDeployment;

import React from 'react';
import { Box, Heading, VStack, Text, Progress, Link } from '@chakra-ui/react';

function DeploymentProcess({ deploymentStatus, setDeploymentStatus }) {
  return (
    <Box>
      <Heading as="h2" size="lg">Deployment Process</Heading>
      <VStack spacing={4} align="stretch">
        {Object.entries(deploymentStatus).map(([file, status]) => (
          <Box key={file} borderWidth={1} p={4} borderRadius="md">
            <Text fontWeight="bold">{file}</Text>
            <Progress value={status.progress} />
            <Text>Status: {status.status}</Text>
            {status.txHash && (
              <Link href={`https://etherscan.io/tx/${status.txHash}`} isExternal>
                View on Etherscan
              </Link>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default DeploymentProcess;

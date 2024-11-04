import React from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';

function Logger({ logs }) {
  return (
    <Box>
      <Heading as="h2" size="lg">Deployment Logs</Heading>
      <VStack spacing={2} align="stretch" maxHeight="300px" overflowY="auto">
        {logs.map((log, index) => (
          <Text key={index} fontSize="sm">
            {log.timestamp}: {log.message}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}

export default Logger;

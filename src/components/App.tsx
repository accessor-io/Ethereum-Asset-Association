import React from 'react';
import { Box, VStack, HStack, Heading, useColorModeValue } from "@chakra-ui/react";
import Link from 'next/link';
import ENSResolver from './ENS/ENSResolver';
import CrossChainCommunicationComponent from './ENS/CrossChainCommunication';

function App() {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box bg={bgColor} minHeight="100vh">
      <VStack spacing={8} align="stretch" p={5}>
        <Heading as="h1" size="xl" textAlign="center">
          Ethereum Name Service (ENS) Management
        </Heading>
        <HStack as="nav" spacing={4} justify="center">
          <Link href="/">Home</Link>
          <Link href="/cross-chain">Cross Chain Communication</Link>
        </HStack>
        <ENSResolver />
        <CrossChainCommunicationComponent />
      </VStack>
    </Box>
  );
}

export default App;
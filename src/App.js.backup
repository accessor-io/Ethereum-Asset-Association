import React from 'react';
import { ChakraProvider, Box, VStack, HStack, Heading, useColorModeValue } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import ENSResolver from './components/ENS/ENSResolver';
import CrossChainCommunicationComponent from './components/ENS/CrossChainCommunication';
import { Web3Provider } from './contexts/Web3Context';
import { ENSProvider } from './contexts/ENSContext';

function App({ Component, pageProps }) {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <ChakraProvider>
      <Web3Provider>
        <ENSProvider>
          <Box bg={bgColor} minHeight="100vh">
            <VStack spacing={8} align="stretch" p={5}>
              <Heading as="h1" size="xl" textAlign="center">
                Ethereum Name Service (ENS) Management
              </Heading>
              <HStack as="nav" spacing={4} justify="center">
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/cross-chain">
                  <a>Cross Chain Communication</a>
                </Link>
              </HStack>
              <Component {...pageProps} />
            </VStack>
          </Box>
          <ToastContainer />
        </ENSProvider>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default App;
import React from 'react';
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apolloClient';
import { Header } from './components/Header';
import MainContent from './components/MainContent';
import { Footer } from './components/Footer';
import { Web3Provider } from './contexts/Web3Context';
import { ENSProvider } from './contexts/ENSContext';

function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Web3Provider>
          <ENSProvider>
            <Box minHeight="100vh">
              <Container maxW="container.xl">
                <Header />
                <MainContent />
                <Footer />
              </Container>
            </Box>
          </ENSProvider>
        </Web3Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
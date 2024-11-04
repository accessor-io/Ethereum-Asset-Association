import { useState } from 'react';
import Head from 'next/head';
import { Box, VStack, HStack, Heading, Tab, Tabs, TabList, TabPanel, TabPanels, Button } from "@chakra-ui/react";
import { useWeb3 } from '../src/contexts/Web3Context';
import ENSResolver from '../src/components/ENS/ENSResolver';
import ReverseLookup from '../src/components/ENS/ReverseLookup';
import CrossChainCommunication from '../src/components/ENS/CrossChainCommunication';
import ManageRecords from '../src/components/ENS/ManageRecords';
import LookupService from '../src/components/ENS/LookupService';
import styles from '../styles/Home.module.css';

export default function ENSExplorer() {
  const { isConnected, connect, disconnect } = useWeb3();

  return (
    <Box minHeight="100vh" className={styles.container}>
      <Head>
        <title>Web3 ENS Explorer</title>
        <meta name="description" content="Explore Ethereum Name Service with style" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="header" className={styles.header}>
        <Heading as="h1" size="xl" className={`${styles.title} neonText`}>Web3 ENS Explorer</Heading>
        <Button onClick={isConnected ? disconnect : connect}>
          {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
        </Button>
      </Box>

      <Box as="main" className={`${styles.main} floatingElement`}>
        <Tabs isFitted variant="enclosed" width="100%">
          <TabList mb="1em">
            <Tab>Resolve ENS</Tab>
            <Tab>Reverse Lookup</Tab>
            <Tab>Cross-Chain</Tab>
            <Tab>Manage Records</Tab>
            <Tab>Lookup Service</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ENSResolver />
            </TabPanel>
            <TabPanel>
              <ReverseLookup />
            </TabPanel>
            <TabPanel>
              <CrossChainCommunication />
            </TabPanel>
            <TabPanel>
              <ManageRecords />
            </TabPanel>
            <TabPanel>
              <LookupService />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Box as="footer" className={styles.footer}>
        <p>Powered by Web3 Technology</p>
      </Box>
    </Box>
  );
}
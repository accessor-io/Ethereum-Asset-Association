import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LookupTab from './LookupTab';
import ManageTab from './ManageTab';
import AttestationsTab from './AttestationsTab';
import CrossChainCommunicationTab from './CrossChainCommunicationTab';
import AssociatedAssets from './ENS/AssociatedAssets';
import AddAttestation from './ENS/AddAttestation';

const MainContent = () => {
  return (
    <Tabs variant="enclosed" colorScheme="blue">
      <TabList>
        <Tab>Lookup</Tab>
        <Tab>Manage</Tab>
        <Tab>Attestations</Tab>
        <Tab>Cross-Chain Communication</Tab>
        <Tab>Associated Assets</Tab>
        <Tab>Add Attestation</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LookupTab />
        </TabPanel>
        <TabPanel>
          <ManageTab />
        </TabPanel>
        <TabPanel>
          <AttestationsTab />
        </TabPanel>
        <TabPanel>
          <CrossChainCommunicationTab />
        </TabPanel>
        <TabPanel>
          <AssociatedAssets />
        </TabPanel>
        <TabPanel>
          <AddAttestation />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainContent;
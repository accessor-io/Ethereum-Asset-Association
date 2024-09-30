import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Box, Button, Container, Flex, Heading, Input, VStack, HStack, Text, 
  Tabs, TabList, TabPanels, Tab, TabPanel, useToast, Spinner, 
  Table, Thead, Tbody, Tr, Th, Td, Checkbox, Select, Textarea,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Menu, MenuButton, MenuList, MenuItem, IconButton,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon
} from "@chakra-ui/react";
import { ChevronDownIcon, DownloadIcon, UploadIcon, SearchIcon } from "@chakra-ui/icons";
import RegistryABI from "./Registry.json";
import ResolverABI from "./Resolver.json";
import { initializeWeb3 } from './utils/web3';

function App() {
  const [addresses, setAddresses] = useState([{ address: "", detail: "", isContract: false, isProxy: false }]);
  const [uid, setUid] = useState("");
  const [hash, setHash] = useState("");
  const [resolverAddress, setResolverAddress] = useState("");
  const [registryContract, setRegistryContract] = useState(null);
  const [resolverContract, setResolverContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWeb3Initialized, setIsWeb3Initialized] = useState(false);
  const [attestations, setAttestations] = useState([]);
  const [selectedAttestation, setSelectedAttestation] = useState(null);
  const [newAddress, setNewAddress] = useState({ address: "", detail: "", isContract: false, isProxy: false });
  
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedNetwork, setSelectedNetwork] = useState("mainnet");
  const [gasEstimate, setGasEstimate] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { provider, signer } = await initializeWeb3();
        setIsWeb3Initialized(true);

        const registryAddress = process.env.REACT_APP_REGISTRY_ADDRESS;
        const registry = new ethers.Contract(registryAddress, RegistryABI, signer);
        setRegistryContract(registry);

        await loadAttestations(registry);
      } catch (err) {
        console.error('Error initializing Web3:', err);
        toast({
          title: "Error",
          description: "Failed to initialize Web3. Please check your wallet connection.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsWeb3Initialized(false);
      }
    };
    init();
  }, [toast]);

  const loadAttestations = async (registry) => {
    const attestationCount = await registry.getAttestationCount();
    const loadedAttestations = [];
    for (let i = 0; i < attestationCount; i++) {
      const hash = await registry.getAttestationHash(i);
      const attestation = await registry.getAttestation(hash);
      loadedAttestations.push({ hash, ...attestation });
    }
    setAttestations(loadedAttestations);
  };

  const addAddressField = () => {
    setAddresses([...addresses, { address: "", detail: "", isContract: false, isProxy: false }]);
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = addresses.map((item, i) => (
      i === index ? { ...item, [field]: value } : item
    ));
    setAddresses(newAddresses);
  };

  const generateUID = () => {
    const hash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address[]"], [addresses.map(a => a.address)]));
    setUid(hash);
  };

  const createAttestation = async () => {
    setLoading(true);
    try {
      if (!registryContract) throw new Error("Registry contract is not set");
      const tx = await registryContract.createAttestation(
        addresses.map(a => a.address),
        addresses.map(a => a.detail),
        addresses.map(a => a.isContract),
        addresses.map(a => a.isProxy)
      );
      await tx.wait();
      toast({
        title: "Success",
        description: "Attestation created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await loadAttestations(registryContract);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addAddressToAttestation = async () => {
    if (!selectedAttestation) {
      toast({
        title: "Error",
        description: "Please select an attestation first",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const tx = await registryContract.addAddressToAttestation(
        selectedAttestation.hash,
        newAddress.address,
        newAddress.detail,
        newAddress.isContract,
        newAddress.isProxy
      );
      await tx.wait();
      toast({
        title: "Success",
        description: "Address added to attestation successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await loadAttestations(registryContract);
      setNewAddress({ address: "", detail: "", isContract: false, isProxy: false });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeAddressFromAttestation = async (index) => {
    if (!selectedAttestation) {
      toast({
        title: "Error",
        description: "Please select an attestation first",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const tx = await registryContract.removeAddressFromAttestation(selectedAttestation.hash, index);
      await tx.wait();
      toast({
        title: "Success",
        description: "Address removed from attestation successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await loadAttestations(registryContract);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAttestation = async () => {
    if (!selectedAttestation) {
      toast({
        title: "Error",
        description: "Please select an attestation first",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const isValid = await registryContract.verifyAttestation(selectedAttestation.hash);
      toast({
        title: "Verification Result",
        description: isValid ? "Attestation is valid" : "Attestation is not valid",
        status: isValid ? "success" : "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchResolver = async () => {
    setLoading(true);
    try {
      if (!registryContract) throw new Error("Registry contract is not set");
      const resolver = await registryContract.resolverOf(hash);
      setResolverAddress(resolver);
      const resolverInstance = new ethers.Contract(resolver, ResolverABI, registryContract.signer);
      setResolverContract(resolverInstance);
      toast({
        title: "Success",
        description: "Resolver fetched successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addAddressToResolver = async () => {
    setLoading(true);
    try {
      if (!resolverContract) throw new Error("Resolver contract is not set");
      const tx = await resolverContract.setAddr(hash, addresses[0].address);
      await tx.wait();
      toast({
        title: "Success",
        description: "Address added to resolver successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
    // Implement logic to switch networks
  };

  const estimateGas = async (operation) => {
    // Implement gas estimation logic
    setGasEstimate("50000"); // Placeholder value
  };

  const exportAttestations = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(attestations));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "attestations.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importAttestations = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedAttestations = JSON.parse(e.target.result);
      setAttestations([...attestations, ...importedAttestations]);
    };
    reader.readAsText(file);
  };

  const openDetailedView = (attestation) => {
    setModalContent(attestation);
    onOpen();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAttestations = attestations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          ENS Management and Attestation Group Interface
        </Heading>
        
        <HStack justifyContent="space-between">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Network: {selectedNetwork}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleNetworkChange("mainnet")}>Mainnet</MenuItem>
              <MenuItem onClick={() => handleNetworkChange("goerli")}>Goerli</MenuItem>
              <MenuItem onClick={() => handleNetworkChange("sepolia")}>Sepolia</MenuItem>
            </MenuList>
          </Menu>
          <HStack>
            <Button leftIcon={<DownloadIcon />} onClick={exportAttestations}>Export</Button>
            <Button leftIcon={<UploadIcon />} onClick={() => document.getElementById('fileInput').click()}>
              Import
            </Button>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={importAttestations}
            />
          </HStack>
        </HStack>
        
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Create Attestation</Tab>
            <Tab>Manage Attestations</Tab>
            <Tab>Resolver Actions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading as="h2" size="lg">Create New Attestation</Heading>
                {addresses.map((item, index) => (
                  <Box key={index} borderWidth={1} borderRadius="lg" p={4}>
                    <VStack spacing={2}>
                      <Input
                        placeholder="Enter address or ENS name"
                        value={item.address}
                        onChange={(e) => handleAddressChange(index, "address", e.target.value)}
                      />
                      <Input
                        placeholder="Enter detail"
                        value={item.detail}
                        onChange={(e) => handleAddressChange(index, "detail", e.target.value)}
                      />
                      <HStack>
                        <Checkbox
                          isChecked={item.isContract}
                          onChange={(e) => handleAddressChange(index, "isContract", e.target.checked)}
                        >
                          Is Contract
                        </Checkbox>
                        <Checkbox
                          isChecked={item.isProxy}
                          onChange={(e) => handleAddressChange(index, "isProxy", e.target.checked)}
                        >
                          Is Proxy
                        </Checkbox>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
                <Button colorScheme="blue" onClick={addAddressField}>
                  Add Address
                </Button>
                <Button colorScheme="green" onClick={() => {
                  estimateGas("createAttestation");
                  createAttestation();
                }} isLoading={loading}>
                  Create Attestation
                </Button>
                {gasEstimate && <Text>Estimated Gas: {gasEstimate}</Text>}
                <Button onClick={generateUID}>Generate UID</Button>
                <Text>Generated UID: {uid}</Text>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading as="h2" size="lg">Manage Attestations</Heading>
                <HStack>
                  <Input
                    placeholder="Search attestations"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <IconButton aria-label="Search" icon={<SearchIcon />} />
                </HStack>
                <Accordion allowMultiple>
                  {currentAttestations
                    .filter(attestation => 
                      attestation.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      attestation.addresses.some(address => 
                        address.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    )
                    .map((attestation, index) => (
                      <AccordionItem key={index}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              Attestation {index + 1}: {attestation.hash.slice(0, 10)}...
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <VStack align="stretch">
                            <Text><strong>Hash:</strong> {attestation.hash}</Text>
                            <Table variant="simple">
                              <Thead>
                                <Tr>
                                  <Th>Address</Th>
                                  <Th>Detail</Th>
                                  <Th>Is Contract</Th>
                                  <Th>Is Proxy</Th>
                                  <Th>Action</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {attestation.addresses.map((address, addrIndex) => (
                                  <Tr key={addrIndex}>
                                    <Td>{address}</Td>
                                    <Td>{attestation.details[addrIndex]}</Td>
                                    <Td>{attestation.isContracts[addrIndex] ? "Yes" : "No"}</Td>
                                    <Td>{attestation.isProxies[addrIndex] ? "Yes" : "No"}</Td>
                                    <Td>
                                      <Button colorScheme="red" size="sm" onClick={() => removeAddressFromAttestation(addrIndex)}>
                                        Remove
                                      </Button>
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                            <Button onClick={() => openDetailedView(attestation)}>View Details</Button>
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    ))
                  }
                </Accordion>
                <HStack justifyContent="center">
                  {[...Array(Math.ceil(attestations.length / itemsPerPage)).keys()].map(number => (
                    <Button key={number} onClick={() => paginate(number + 1)}>
                      {number + 1}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading as="h2" size="lg">Resolver Actions</Heading>
                <Input
                  placeholder="Enter hash"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                />
                <Button colorScheme="purple" onClick={fetchResolver} isLoading={loading}>
                  Fetch Resolver
                </Button>
                <Text>Resolver Address: {resolverAddress}</Text>
                <Button colorScheme="purple" onClick={addAddressToResolver} isLoading={loading}>
                  Add Address to Resolver
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Attestation Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalContent && (
                <VStack align="stretch">
                  <Text><strong>Hash:</strong> {modalContent.hash}</Text>
                  <Text><strong>Created:</strong> {new Date(modalContent.createdAt * 1000).toLocaleString()}</Text>
                  <Text><strong>Last Modified:</strong> {new Date(modalContent.lastModified * 1000).toLocaleString()}</Text>
                  <Text><strong>Addresses:</strong></Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Address</Th>
                        <Th>Detail</Th>
                        <Th>Is Contract</Th>
                        <Th>Is Proxy</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {modalContent.addresses.map((address, index) => (
                        <Tr key={index}>
                          <Td>{address}</Td>
                          <Td>{modalContent.details[index]}</Td>
                          <Td>{modalContent.isContracts[index] ? "Yes" : "No"}</Td>
                          <Td>{modalContent.isProxies[index] ? "Yes" : "No"}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {loading && (
          <Flex justify="center" align="center" position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0,0,0,0.5)" zIndex="9999">
            <Spinner size="xl" color="white" />
          </Flex>
        )}
      </VStack>
    </Container>
  );
}

export default App;
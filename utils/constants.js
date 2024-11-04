import { ethers } from 'ethers';
import {
  ENSRegistry,
  BaseRegistrarImplementation,
  ETHRegistrarController,
  PublicResolver,
  ReverseRegistrar
} from '@ensdomains/ens-contracts';

// Ethereum Mainnet addresses
export const ENS_REGISTRY_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
export const BASE_REGISTRAR_ADDRESS = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
export const ETH_REGISTRAR_CONTROLLER_ADDRESS = '0x253553366Da8546fC250F225fe3d25d0C782303b';
export const PUBLIC_RESOLVER_ADDRESS = '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63';
export const REVERSE_REGISTRAR_ADDRESS = '0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb';

// ABIs
export const ENS_REGISTRY_ABI = ENSRegistry.abi;
export const BASE_REGISTRAR_ABI = BaseRegistrarImplementation.abi;
export const ETH_REGISTRAR_CONTROLLER_ABI = ETHRegistrarController.abi;
export const PUBLIC_RESOLVER_ABI = PublicResolver.abi;
export const REVERSE_REGISTRAR_ABI = ReverseRegistrar.abi;

// Helper function to create contract instances
export const getContract = (address, abi, signerOrProvider) => {
  return new ethers.Contract(address, abi, signerOrProvider);
};

// Contract addresses
export const CONTRACT_ADDRESSES = {
  ENS_REGISTRY: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // Mainnet ENS Registry
  ENS_REGISTRAR: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', // Mainnet ENS Base Registrar
  PUBLIC_RESOLVER: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41', // Mainnet Public Resolver
  // Add any other contract addresses you need
};

// You can also export other constants here if needed
export const ENS_DOMAIN = '.eth';
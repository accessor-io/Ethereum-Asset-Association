// Export all configuration settings
export * from './networkConfig';
export * from './constants';
export * from './contracts';

// Environment-specific settings
export const ENV = process.env.NODE_ENV || 'development';
export const IS_DEV = ENV === 'development';
export const IS_PROD = ENV === 'production';
export const IS_TEST = ENV === 'test';

// API endpoints
export const API_ENDPOINTS = {
  mainnet: process.env.REACT_APP_MAINNET_API,
  testnet: process.env.REACT_APP_TESTNET_API,
  ens: process.env.REACT_APP_ENS_API,
  attestation: process.env.REACT_APP_ATTESTATION_API
};

// Contract addresses
export const CONTRACT_ADDRESSES = {
  mainnet: {
    ensRegistry: process.env.REACT_APP_ENS_REGISTRY_MAINNET,
    attestationManager: process.env.REACT_APP_ATTESTATION_MANAGER_MAINNET
  },
  testnet: {
    ensRegistry: process.env.REACT_APP_ENS_REGISTRY_TESTNET,
    attestationManager: process.env.REACT_APP_ATTESTATION_MANAGER_TESTNET
  }
};

// Feature flags
export const FEATURES = {
  enableAttestation: true,
  enableCrossChain: true,
  enableENS: true
}; 
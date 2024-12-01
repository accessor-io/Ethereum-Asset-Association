export const SUPPORTED_CHAINS = Object.freeze([1, 5, 11155111]);

export const APP_CONFIG = Object.freeze({
  APP_NAME: 'ENS Manager',
  SUPPORTED_CHAINS,
  API_ENDPOINTS: {
    ENS: process.env.VITE_ENS_API_URL || 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    EAS: process.env.VITE_EAS_API_URL || 'https://api.attestation.station',
  },
});

export const ERROR_MESSAGES = Object.freeze({
  WALLET_CONNECTION: 'Please connect your wallet first',
  SEARCH_FAILED: 'Failed to search ENS name',
  REGISTRATION_FAILED: 'Failed to register ENS name',
  UPDATE_FAILED: 'Failed to update records',
}); 
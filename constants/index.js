import { mainnet, goerli, sepolia } from 'wagmi/chains';

export const SUPPORTED_CHAINS = [mainnet, goerli, sepolia];

export const APP_CONFIG = {
  APP_NAME: 'ENS Manager',
  SUPPORTED_CHAINS,
  API_ENDPOINTS: {
    ENS: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    EAS: 'https://api.attestation.station',
  },
}; 
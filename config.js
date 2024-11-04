export const CONTRACT_ADDRESSES = {
  1: {
    ENS_REGISTRY: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    PUBLIC_RESOLVER: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    EAS: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
  },
  // Add addresses for other networks (3, 4, 5, 42)
};

export const SUPPORTED_CHAINS = [1, 3, 4, 5, 42];

export const NETWORK_NAMES = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten Testnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  42: 'Kovan Testnet'
};

export const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
  3: 'https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID',
  4: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID',
  5: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
  42: 'https://kovan.infura.io/v3/YOUR_INFURA_PROJECT_ID'
};
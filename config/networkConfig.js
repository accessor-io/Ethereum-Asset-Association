export const NETWORKS = {
  // Ethereum Mainnet
  ethereum_mainnet: {
    name: "Ethereum Mainnet",
    chainId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/YOUR-PROJECT-ID",
    explorer: "https://etherscan.io/",
  },
  // Ethereum Testnets
  goerli: {
    name: "Goerli Testnet",
    chainId: 5,
    rpcUrl: "https://goerli.infura.io/v3/YOUR-PROJECT-ID",
    explorer: "https://goerli.etherscan.io/",
  },
  sepolia: {
    name: "Sepolia Testnet",
    chainId: 11155111,
    rpcUrl: "https://sepolia.infura.io/v3/YOUR-PROJECT-ID",
    explorer: "https://sepolia.etherscan.io/",
  },
  // Polygon
  polygon_mainnet: {
    name: "Polygon Mainnet",
    chainId: 137,
    rpcUrl: "https://polygon-rpc.com/",
    explorer: "https://polygonscan.com/",
  },
  polygon_mumbai: {
    name: "Polygon Mumbai",
    chainId: 80001,
    rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    explorer: "https://mumbai.polygonscan.com/",
  },
  // Arbitrum
  arbitrum_one: {
    name: "Arbitrum One",
    chainId: 42161,
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io/",
  },
  arbitrum_goerli: {
    name: "Arbitrum Goerli",
    chainId: 421613,
    rpcUrl: "https://goerli-rollup.arbitrum.io/rpc",
    explorer: "https://goerli.arbiscan.io/",
  },
  // Optimism
  optimism_mainnet: {
    name: "Optimism",
    chainId: 10,
    rpcUrl: "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io/",
  },
  optimism_goerli: {
    name: "Optimism Goerli",
    chainId: 420,
    rpcUrl: "https://goerli.optimism.io",
    explorer: "https://goerli-optimism.etherscan.io/",
  },
  // Binance Smart Chain
  bsc_mainnet: {
    name: "Binance Smart Chain",
    chainId: 56,
    rpcUrl: "https://bsc-dataseed.binance.org/",
    explorer: "https://bscscan.com/",
  },
  bsc_testnet: {
    name: "BSC Testnet",
    chainId: 97,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    explorer: "https://testnet.bscscan.com/",
  },
  // Avalanche
  avalanche_mainnet: {
    name: "Avalanche C-Chain",
    chainId: 43114,
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://snowtrace.io/",
  },
  avalanche_fuji: {
    name: "Avalanche Fuji Testnet",
    chainId: 43113,
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    explorer: "https://testnet.snowtrace.io/",
  },
  // Fantom
  fantom_opera: {
    name: "Fantom Opera",
    chainId: 250,
    rpcUrl: "https://rpcapi.fantom.network",
    explorer: "https://ftmscan.com/",
  },
  fantom_testnet: {
    name: "Fantom Testnet",
    chainId: 4002,
    rpcUrl: "https://rpc.testnet.fantom.network",
    explorer: "https://testnet.ftmscan.com/",
  },
};

export const networkConfig = {
  chainId: 1, // Mainnet
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
  ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  // Add other network-specific configurations here
};

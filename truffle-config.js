module.exports = {
  compilers: {
    solc: {
      version: '0.8.26',    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: 'berlin'  // Optional, specify an EVM version supported by solc
      }
    }
  }
};

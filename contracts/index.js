import { ethers } from 'ethers';

// Import ABI files (you'll need to create these)
import ENS_REGISTRY_ABI from './abis/ENSRegistry.json';
import PUBLIC_RESOLVER_ABI from './abis/PublicResolver.json';
import ETH_REGISTRAR_ABI from './abis/ETHRegistrar.json';

const getContractAddress = (networkName, contractType) => {
  const envVar = `REACT_APP_${networkName.toUpperCase()}_${contractType.toUpperCase()}`;
  const address = process.env[envVar];
  if (!address) {
    console.error(`Contract address not found for ${networkName} ${contractType}`);
  }
  return address;
};

export const getContracts = (provider, networkName) => {
  const signer = provider.getSigner();

  const ensRegistryAddress = getContractAddress(networkName, 'ENS_REGISTRY');
  const publicResolverAddress = getContractAddress(networkName, 'PUBLIC_RESOLVER');
  const ethRegistrarAddress = getContractAddress(networkName, 'ETH_REGISTRAR');

  return {
    ensRegistry: new ethers.Contract(ensRegistryAddress, ENS_REGISTRY_ABI, signer),
    publicResolver: new ethers.Contract(publicResolverAddress, PUBLIC_RESOLVER_ABI, signer),
    ethRegistrar: new ethers.Contract(ethRegistrarAddress, ETH_REGISTRAR_ABI, signer),
  };
};
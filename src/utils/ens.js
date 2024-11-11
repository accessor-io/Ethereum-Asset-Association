import { ethers } from 'ethers';
import { getENS, getSigner } from './ethereum';
import { normalize } from '@ensdomains/eth-ens-namehash';
import axios from 'axios';
import { getCachedENSResolution, setCachedENSResolution } from './ensCache';
import { CONTRACT_ADDRESSES } from './constants';
import { BaseRegistrarImplementation, ENSRegistry } from '@ensdomains/ens-contracts';

const ENS_REGISTRAR_ABI = BaseRegistrarImplementation.abi;
const ENS_REGISTRY_ABI = ENSRegistry.abi;

const PROFILE_KEYS = ['name', 'url', 'avatar', 'description', 'notice', 'keywords', 'com.discord', 'com.github', 'com.reddit', 'com.twitter', 'org.telegram'];

export const resolveENS = async (ensName, chainId) => {
  const cachedAddress = getCachedENSResolution(ensName);
  if (cachedAddress) return cachedAddress;

  const provider = getENS(chainId);
  const address = await provider.resolveName(ensName);
  if (address) {
    setCachedENSResolution(ensName, address);
  }
  return address;
}

export const lookupAddress = async (address, chainId) => {
  const provider = getENS(chainId);
  const ensName = await provider.lookupAddress(address);
  return ensName;
}

export const resolveMultichainAddress = async (ensName, coinType, chainId) => {
  const provider = getENS(chainId);
  const resolver = await provider.getResolver(ensName);
  if (!resolver) return null;
  return await resolver.getAddress(coinType);
}

export const getTextRecord = async (ensName, key, chainId) => {
  const provider = getENS(chainId);
  const resolver = await provider.getResolver(ensName);
  if (!resolver) return null;
  return await resolver.getText(key);
}

export const setTextRecord = async (ensName, key, value, chainId) => {
  const signer = await getSigner();
  const provider = getENS(chainId);
  const resolver = await provider.getResolver(ensName);
  if (!resolver) throw new Error("No resolver set");
  const resolverWithSigner = resolver.connect(signer);
  const tx = await resolverWithSigner.setText(key, value);
  return await tx.wait();
}

export const getContentHash = async (ensName) => {
  const provider = getENS();
  const resolver = await provider.getResolver(ensName);
  if (!resolver) return null;
  return await resolver.getContentHash();
}

export const setContentHash = async (ensName, hash) => {
  const signer = await getSigner();
  const resolver = await signer.getResolver(ensName);
  if (!resolver) throw new Error("No resolver set");
  const tx = await resolver.setContentHash(hash);
  return await tx.wait();
}

export const reverseResolve = async (address) => {
  const provider = getENS();
  const name = await provider.lookupAddress(address);
  return name;
}

export const supportsInterface = async (ensName, interfaceId) => {
  const provider = getENS();
  const resolver = await provider.getResolver(ensName);
  if (!resolver) return false;
  return await resolver.supportsInterface(interfaceId);
}

export const resolveWildcard = async (name) => {
  const provider = getENS();
  const node = ethers.utils.namehash(name);
  const resolver = await provider.getResolver(node);
  if (!resolver) return null;
  return await resolver.resolve(node, ['addr(uint256)']);
}

export const normalizeENSName = (name) => {
  return normalize(name);
}

export const getOffchainMetadata = async (ensName) => {
  const contentHash = await getContentHash(ensName);
  if (!contentHash) return null;
  const url = `https://ipfs.io/ipfs/${contentHash.slice(7)}`;
  const response = await axios.get(url);
  return response.data;
}

export const getProfile = async (ensName, chainId) => {
  const profile = {};
  for (const key of PROFILE_KEYS) {
    profile[key] = await getTextRecord(ensName, key, chainId);
  }
  return profile;
}

export const evmChainReverseResolve = async (address, chainId) => {
  const provider = getENS();
  const reverseNode = ethers.utils.namehash(`${address.toLowerCase().slice(2)}.addr.reverse`);
  const resolver = await provider.getResolver(reverseNode);
  if (!resolver) return null;
  return await resolver.name(reverseNode);
}

export const batchResolveENS = async (ensNames, chainId) => {
  const provider = getENS(chainId);
  const promises = ensNames.map(name => provider.resolveName(name));
  return await Promise.all(promises);
}

export const isENSNameAvailable = async (ensName, chainId) => {
  const provider = getENS(chainId);
  const address = await provider.resolveName(ensName);
  return address === null;
}

export async function getEnsName(provider, address) {
  try {
    const name = await provider.lookupAddress(address);
    return name;
  } catch (error) {
    console.error('Error getting ENS name:', error);
    return null;
  }
}

export async function getEnsAvatar(provider, ensName) {
  try {
    const resolver = await provider.getResolver(ensName);
    const avatar = await resolver.getText('avatar');
    return avatar;
  } catch (error) {
    console.error('Error getting ENS avatar:', error);
    return null;
  }
}

// Add these new functions to the existing ens.js file

export const registerENS = async (name, duration, chainId) => {
  const signer = await getSigner();
  const provider = getENS(chainId);
  const registrar = new ethers.Contract(CONTRACT_ADDRESSES.ENS_REGISTRAR, ENS_REGISTRAR_ABI, signer);
  
  const price = await registrar.rentPrice(name, duration * 365 * 24 * 60 * 60);
  const tx = await registrar.register(name, signer.getAddress(), duration * 365 * 24 * 60 * 60, { value: price });
  await tx.wait();
};

export const transferENS = async (name, recipient, chainId) => {
  const signer = await getSigner();
  const provider = getENS(chainId);
  const registry = new ethers.Contract(CONTRACT_ADDRESSES.ENS_REGISTRY, ENS_REGISTRY_ABI, signer);
  
  const nameHash = ethers.utils.namehash(name);
  const tx = await registry.setOwner(nameHash, recipient);
  await tx.wait();
};

console.log('CONTRACT_ADDRESSES:', CONTRACT_ADDRESSES); // Add this line for debugging
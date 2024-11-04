import { ethers } from 'ethers';
import { getENS, switchChain } from './ethereum';

export const crossChainResolveENS = async (ensName, sourceChainId, targetChainId) => {
  await switchChain(sourceChainId);
  const sourceProvider = getENS(sourceChainId);
  const address = await sourceProvider.resolveName(ensName);
  
  await switchChain(targetChainId);
  const targetProvider = getENS(targetChainId);
  const reverseName = await targetProvider.lookupAddress(address);
  
  return { address, reverseName };
}

export const crossChainSetENSRecord = async (ensName, key, value, sourceChainId, targetChainId) => {
  await switchChain(sourceChainId);
  const sourceProvider = getENS(sourceChainId);
  const resolver = await sourceProvider.getResolver(ensName);
  if (!resolver) throw new Error("No resolver set");
  
  const tx = await resolver.setText(key, value);
  await tx.wait();
  
  await switchChain(targetChainId);
  const targetProvider = getENS(targetChainId);
  const updatedValue = await targetProvider.getText(ensName, key);
  
  return updatedValue;
}
import { ENS } from '@ensdomains/ensjs'
import { getENS } from './ethereum';

let ens;

export const initializeENS = async () => {
  const provider = getENS();
  ens = new ENS({ provider, ensAddress: getEnsAddress('mainnet') })
}

export const getNameOwner = async (name) => {
  return await ens.name(name).getOwner();
}

export const setResolver = async (name, resolverAddress) => {
  const tx = await ens.name(name).setResolver(resolverAddress);
  return await tx.wait();
}

// Add more functions for other ENS operations
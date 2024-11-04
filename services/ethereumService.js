import { ethers } from 'ethers';

let provider;
let signer;

export async function initializeEthereum() {
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  } else {
    console.error('Ethereum provider not found');
  }
}

export async function getProvider() {
  if (!provider) {
    await initializeEthereum();
  }
  return provider;
}

export async function getSigner() {
  if (!signer) {
    await initializeEthereum();
  }
  return signer;
}

export const connectToEthereum = async () => {
  await initializeEthereum();
};

export const getENSRegistry = async (address, signer) => {
  const abi = [/* ENS Registry ABI */];
  return getENSContract(address, abi, signer);
};


export const getENSContract = async (address, abi, signer) => {
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};
// Add more Ethereum-related functions as needed

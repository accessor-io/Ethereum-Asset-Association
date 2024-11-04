import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AttestationServiceABI from '../abis/AttestationService.json';

export function useContract(contractName: string) {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    // Replace with your deployed contract address
    const contractAddress = '0x...';  

    const newContract = new ethers.Contract(contractAddress, AttestationServiceABI, signer);
    setContract(newContract);
  }, [contractName]);

  return contract;
}
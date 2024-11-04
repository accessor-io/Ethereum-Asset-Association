import React, { createContext, useContext } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './Web3Context';

interface ENSContextType {
  resolveName: (name: string) => Promise<string | null>;
  lookupAddress: (address: string) => Promise<string | null>;
}

const ENSContext = createContext<ENSContextType | undefined>(undefined);

export function ENSProvider({ children }: { children: React.ReactNode }) {
  const { provider } = useWeb3();

  const resolveName = async (name: string): Promise<string | null> => {
    try {
      if (!provider) throw new Error("Provider not available");
      return await provider.resolveName(name);
    } catch (error) {
      console.error('Error resolving ENS name:', error);
      return null;
    }
  };

  const lookupAddress = async (address: string): Promise<string | null> => {
    try {
      if (!provider) throw new Error("Provider not available");
      if (!ethers.utils.isAddress(address)) {
        throw new Error('Invalid Ethereum address');
      }
      return await provider.lookupAddress(address);
    } catch (error) {
      console.error('Error looking up ENS name:', error);
      return null;
    }
  };

  return (
    <ENSContext.Provider value={{ resolveName, lookupAddress }}>
      {children}
    </ENSContext.Provider>
  );
}

export function useENS() {
  const context = useContext(ENSContext);
  if (context === undefined) {
    throw new Error('useENS must be used within an ENSProvider');
  }
  return context;
}
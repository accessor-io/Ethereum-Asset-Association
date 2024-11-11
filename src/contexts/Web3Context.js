import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { NETWORK_NAMES } from '../config';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [network, setNetwork] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const signer = provider.getSigner();
        setSigner(signer);

        const network = await provider.getNetwork();
        setNetwork(network);

        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }

        window.ethereum.on('chainChanged', (chainId) => {
          setNetwork({ chainId: parseInt(chainId, 16) });
        });

        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0] || null);
        });
      }
    };

    init();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, network, account }}>
      {children}
    </Web3Context.Provider>
  );
};
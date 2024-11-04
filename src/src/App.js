import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Description from './components/Description';
import Instructions from './components/Instructions';
import Fees from './components/Fees';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ContactModal from './components/ContactModal';
import { ethers } from 'ethers';

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      setWalletConnected(true);
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div>
      <Header connectWallet={connectWallet} walletConnected={walletConnected} />
      <Navigation />
      <div className="container">
        <Description />
        <Instructions signer={signer} />
        <Fees />
        <FAQ />
        <Contact />
      </div>
      <ContactModal />
    </div>
  );
};

export default App;

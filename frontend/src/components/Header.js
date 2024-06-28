import React from 'react';

const Header = ({ connectWallet, walletConnected }) => {
  return (
    <header>
      <h1>Attestation Manager Service</h1>
      <button onClick={connectWallet}>
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </header>
  );
};

export default Header;

import React from 'react';

const ConnectButton = ({ isConnected, address }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium ${
        isConnected
          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectButton; 
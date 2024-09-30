import React from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';
import NameLookup from './components/ENS/NameLookup';
import RegisterName from './components/ENS/RegisterName';
import ManageNames from './components/ENS/ManageNames';
// Import other components as needed

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function App() {
  return (
    <WagmiConfig client={client}>
      <div className="App">
        <h1>ENS Management System</h1>
        <NameLookup />
        <RegisterName />
        <ManageNames />
        {/* Add other components here */}
      </div>
    </WagmiConfig>
  );
}

export default App;

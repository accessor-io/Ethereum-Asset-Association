import React from 'react';

function CrossChainCommunication() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Cross-Chain Communication Hub</h2>
      <ul className="flex space-x-4 mb-6">
        <li><a href="#" className="text-blue-400">Asset Association</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">CCIP Messaging</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">Data Feeds</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">VRF</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">EAS</a></li>
      </ul>
      <div className="space-y-4">
        <input type="text" placeholder="Group Name" className="w-full p-2 bg-gray-700 rounded" />
        <div className="flex space-x-2">
          <input type="text" placeholder="Address or ENS name" className="flex-grow p-2 bg-gray-700 rounded" />
          <select className="p-2 bg-gray-700 rounded">
            <option>Ethereum</option>
          </select>
          <button className="bg-blue-400 text-gray-900 px-4 py-2 rounded">Add Asset</button>
        </div>
        <button className="w-full bg-gray-700 text-white p-2 rounded">Create Attestation</button>
        <input type="text" placeholder="Attestation Hash" className="w-full p-2 bg-gray-700 rounded" />
        <button className="w-full bg-gray-700 text-white p-2 rounded">Resolve Associated Assets</button>
      </div>
      <div className="mt-6 flex justify-center items-center space-x-4">
        <div>ETH: Loading...</div>
        <div>Gas: Loading...</div>
      </div>
    </div>
  );
}

export default CrossChainCommunication;
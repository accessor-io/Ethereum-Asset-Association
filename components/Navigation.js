import React from 'react';

function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><a href="#" className="text-gray-400 hover:text-white">Lookup</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">Manage</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">Attestations</a></li>
        <li><a href="#" className="text-blue-400">Cross-Chain Communication</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;
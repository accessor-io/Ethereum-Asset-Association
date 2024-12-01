import React, { useState } from 'react';
import Layout from './components/Layout';
import ENSSearch from './components/ens/ENSSearch';
import ENSDetails from './components/ens/ENSDetails';
import Card from './components/common/Card';
import { ERROR_MESSAGES } from './constants';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError('');
    try {
      // Implement ENS search logic here
      setSelectedDomain({ name: searchTerm });
    } catch (err) {
      setError(ERROR_MESSAGES.SEARCH_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout isLoading={isLoading}>
      <div className="space-y-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">ENS Domain Manager</h2>
          <ENSSearch onSearch={handleSearch} />
          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
        </Card>

        {selectedDomain && (
          <Card>
            <ENSDetails domain={selectedDomain} />
          </Card>
        )}

        <Card>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Getting Started</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Connect your Ethereum wallet using the button in the header</li>
              <li>Search for an ENS domain using the search bar above</li>
              <li>View and manage domain details, including records and subdomains</li>
              <li>Register new domains or transfer existing ones</li>
            </ul>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default App;
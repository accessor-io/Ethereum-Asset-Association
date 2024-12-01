import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { Card } from '../components/common/Card';
import { ENSSearch } from '../components/ens/ENSSearch';
import { ENSDetails } from '../components/ens/ENSDetails';
import { ENSRecord } from '../components/ens/ENSRecord';
import { useENS } from '../hooks/useENS';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const HomePage = () => {
  const { isConnected } = useAccount();
  const { searchName, registerName, updateRecords, isLoading } = useENS();
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component mounted with:', {
      isConnected,
      isLoading,
      searchResult,
      error
    });
  }, [isConnected, isLoading, searchResult, error]);

  const handleSearch = async (searchTerm) => {
    setError(null);
    try {
      const result = await searchName(searchTerm);
      setSearchResult(result);
    } catch (err) {
      console.error('Search error:', err);
      setError(err);
      toast.error('Failed to search ENS name');
    }
  };

  const handleRegister = async () => {
    if (!isConnected) {
      toast.error('Failed to connect wallet');
      return;
    }

    try {
      await registerName(searchResult.name);
      toast.success('Registration initiated');
      await handleSearch(searchResult.name);
    } catch (error) {
      toast.error('Failed to register ENS name');
    }
  };

  const handleUpdateRecords = async (records) => {
    if (!isConnected) {
      toast.error('Failed to connect wallet');
      return;
    }

    try {
      await updateRecords(searchResult.name, records);
      toast.success('Records updated successfully');
      await handleSearch(searchResult.name);
    } catch (error) {
      toast.error('Failed to update records');
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <Card
          title="Welcome to ENS Manager"
          description="Search, register, and manage your ENS names"
        >
          <p className="text-gray-600 dark:text-gray-300">
            ENS (Ethereum Name Service) is the distributed, open, and extensible naming system
            based on the Ethereum blockchain. Start by searching for an ENS name below.
          </p>
        </Card>

        <ENSSearch onSearch={handleSearch} />

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        {searchResult && (
          <>
            <ENSDetails
              {...searchResult}
              onRegister={handleRegister}
              isLoading={isLoading}
            />

            {!searchResult.isAvailable && (
              <ENSRecord
                records={searchResult.records}
                onUpdate={handleUpdateRecords}
                isEditable={isConnected}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default HomePage; 
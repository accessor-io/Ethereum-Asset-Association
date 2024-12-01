import { useState } from 'react';

export const useENS = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchName = async (name) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        name,
        isAvailable: Math.random() > 0.5,
        records: {
          'ETH Address': '0x1234...5678',
          'Content Hash': 'ipfs://Qm...',
        },
      };
    } finally {
      setIsLoading(false);
    }
  };

  const registerName = async (name) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecords = async (name, records) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchName,
    registerName,
    updateRecords,
    isLoading,
  };
}; 
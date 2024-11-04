import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    console.error(error);
    setError(error.message || 'An unexpected error occurred');
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  }, []);

  return { error, handleError };
};
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

export const useAdminActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getAuthToken } = useAuth();

  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });

  const handleApiCall = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      return result.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (userData) => {
    return handleApiCall(() => apiClient.post('/users', userData));
  }, [handleApiCall, apiClient]);

  const blockUser = useCallback(async (address) => {
    return handleApiCall(() => apiClient.put(`/users/${address}/block`));
  }, [handleApiCall, apiClient]);

  const unblockUser = useCallback(async (address) => {
    return handleApiCall(() => apiClient.put(`/users/${address}/unblock`));
  }, [handleApiCall, apiClient]);

  const updateSettings = useCallback(async (settings) => {
    return handleApiCall(() => apiClient.put('/settings', settings));
  }, [handleApiCall, apiClient]);

  const refreshCache = useCallback(async () => {
    return handleApiCall(() => apiClient.post('/cache/refresh'));
  }, [handleApiCall, apiClient]);

  const getUserList = useCallback(async (page = 1, limit = 10) => {
    return handleApiCall(() => apiClient.get('/users', { params: { page, limit } }));
  }, [handleApiCall, apiClient]);

  const getAuditLogs = useCallback(async (startDate, endDate, page = 1, limit = 20) => {
    return handleApiCall(() => apiClient.get('/audit-logs', { 
      params: { startDate, endDate, page, limit } 
    }));
  }, [handleApiCall, apiClient]);

  return { 
    addUser, 
    blockUser, 
    unblockUser, 
    updateSettings, 
    refreshCache, 
    getUserList, 
    getAuditLogs,
    loading,
    error
  };
};

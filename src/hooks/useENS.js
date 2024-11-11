import { useState, useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

// Services and utilities
import { ensService } from '../services/ensService';
import { 
    validateAddress, 
    normalizeENSName 
} from '../utils/ethereum';
import { 
    ENS_CACHE_KEY, 
    ENS_CACHE_TIME 
} from '../utils/constants';

export const useENS = (address, options = {}) => {
    // Enhanced state management with loading states
    const [data, setData] = useState({
        avatar: null,
        name: null,
        loading: true,
        error: null,
        lastUpdated: null,
        isStale: false
    });

    // Add retry logic and timeout configuration
    const { 
        retryAttempts = 3, 
        retryDelay = 1000,
        cacheTime = ENS_CACHE_TIME 
    } = options;

    // Web3 context
    const { library, chainId } = useWeb3React();

    // Enhanced caching with validation
    const getCachedData = useCallback((key) => {
        try {
            const cached = localStorage.getItem(`${ENS_CACHE_KEY}_${key}`);
            if (cached) {
                const { value, timestamp } = JSON.parse(cached);
                const isExpired = Date.now() - timestamp > cacheTime;
                if (!isExpired) return value;
                return { ...value, isStale: true };
            }
        } catch (error) {
            console.warn('Cache retrieval failed:', error);
        }
        return null;
    }, [cacheTime]);

    // Enhanced data fetching with retry mechanism
    const fetchENSData = useCallback(async (retryCount = 0) => {
        if (!address || !library || !validateAddress(address)) return;
        
        try {
            const cached = getCachedData(address);
            if (cached && !cached.isStale) {
                setData(cached);
                return;
            }

            const normalizedAddress = normalizeENSName(address);
            const [avatar, name] = await Promise.all([
                ensService.getAvatar(normalizedAddress, library),
                ensService.getName(normalizedAddress, library)
            ]);

            const newData = { 
                avatar, 
                name, 
                loading: false, 
                error: null,
                lastUpdated: Date.now(),
                isStale: false
            };

            setData(newData);

            // Enhanced caching with error handling
            try {
                localStorage.setItem(
                    `${ENS_CACHE_KEY}_${address}`,
                    JSON.stringify({
                        value: newData,
                        timestamp: Date.now()
                    })
                );
            } catch (error) {
                console.warn('Cache storage failed:', error);
            }

        } catch (error) {
            if (retryCount < retryAttempts) {
                setTimeout(() => {
                    fetchENSData(retryCount + 1);
                }, retryDelay * (retryCount + 1));
                return;
            }

            setData(prev => ({
                ...prev,
                loading: false,
                error: error.message,
                lastUpdated: Date.now()
            }));
        }
    }, [address, library, getCachedData, retryAttempts, retryDelay]);

    useEffect(() => {
        fetchENSData();
    }, [fetchENSData, chainId]);

    return data;
};
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // This is where you would typically send analytics data
    console.log(`Page view: ${location.pathname}`);
  }, [location]);
};
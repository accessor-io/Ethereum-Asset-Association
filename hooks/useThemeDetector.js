import { useState, useEffect } from 'react';

export const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());  

  useEffect(() => {
    const mqListener = (e => {
      setIsDarkTheme(e.matches);
    });
    
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    
    return () => darkThemeMq.removeListener(mqListener);
  }, []);

  return isDarkTheme;
}; 
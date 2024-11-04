import { useState, useEffect, useCallback, memo } from 'react';
import { ConnectButton } from '../ConnectButton';
import { styled, keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background}22;
    
    &:after {
      width: 100%;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    background: ${({ theme }) => theme.colors.background}22;
    transform: rotate(180deg);
  }
`;

const NetworkStatus = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  background: ${({ isOnline }) => isOnline ? '#4CAF50' : '#f44336'}22;
  color: ${({ isOnline }) => isOnline ? '#4CAF50' : '#f44336'};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ isOnline }) => isOnline ? '#4CAF50' : '#f44336'};
  }
`;

const MemoizedStyledLink = memo(({ to, active, children }) => (
  <StyledLink to={to} active={active}>
    {children}
  </StyledLink>
));

const MemoizedNetworkStatus = memo(({ isOnline }) => (
  <NetworkStatus isOnline={isOnline}>
    {isOnline ? 'Connected' : 'Offline'}
  </NetworkStatus>
));

const MemoizedThemeToggle = memo(({ onThemeToggle, isDarkMode }) => (
  <ThemeToggle 
    onClick={onThemeToggle}
    aria-label="Toggle theme"
    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    {isDarkMode ? <FaSun /> : <FaMoon />}
  </ThemeToggle>
));

export const Header = memo(({ onThemeToggle, isDarkMode }) => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldScroll = window.scrollY > 50;
    if (shouldScroll !== scrolled) {
      setScrolled(shouldScroll);
    }
  }, [scrolled]);

  const handleOnline = useCallback(() => setIsOnline(true), []);
  const handleOffline = useCallback(() => setIsOnline(false), []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleOnline, handleOffline, handleScroll]);

  const headerStyle = {
    background: scrolled ? 'rgba(255,255,255,0.8)' : 'transparent',
    boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
  };

  const isHomeActive = location.pathname === '/';
  const isEasActive = location.pathname === '/eas';

  return (
    <HeaderWrapper style={headerStyle}>
      <Controls>
        <ConnectButton />
        <MemoizedThemeToggle 
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
        />
        <MemoizedNetworkStatus isOnline={isOnline} />
      </Controls>

      <Nav>
        <MemoizedStyledLink to="/" active={isHomeActive}>
          Home
        </MemoizedStyledLink>
        <MemoizedStyledLink to="/eas" active={isEasActive}>
          EAS
        </MemoizedStyledLink>
      </Nav>
    </HeaderWrapper>
  );
});

Header.displayName = 'Header';
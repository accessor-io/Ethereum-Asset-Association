import { useState, useEffect, Suspense, useCallback, memo } from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { WagmiConfig, createConfig, configureChains, useAccount } from 'wagmi';
import { mainnet, goerli, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom hooks
import { useWindowSize } from './hooks/useWindowSize';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useThemeDetector } from './hooks/useThemeDetector';

// Components
import { Header } from './src/components/Header';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './src/components/common/LoadingSpinner';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { ProgressBar } from './src/components/common/ProgressBar';
import { Modal } from './src/components/common/Modal';

// Providers
import { TransactionFlowProvider } from './features/domains/providers/TransactionFlowProvider';
import { ENSProvider } from './features/domains/providers/ENSProvider';
import { EASProvider } from './features/eas/providers/EASProvider';

// Styles and themes
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './themes';
import { AppWrapper, MainContent, PageTransition } from './styles/AppStyles';

// Constants and utils
import { SUPPORTED_CHAINS, APP_CONFIG } from './constants';
import { analytics } from './utils/analytics';
import { ErrorLogger } from './utils/errorLogger';

// Lazy loaded components with retry logic
const retryLoadComponent = (componentImport) => {
  return new Promise((resolve, reject) => {
    const retryImport = (retries = 0) => {
      componentImport()
        .then(resolve)
        .catch((error) => {
          if (retries < 3) {
            setTimeout(() => retryImport(retries + 1), 1000 * (retries + 1));
          } else {
            reject(error);
          }
        });
    };
    retryImport();
  });
};

const HomePage = React.lazy(() => retryLoadComponent(() => import('./pages/Home')));
const EASPage = React.lazy(() => retryLoadComponent(() => import('./pages/EAS')));
const DomainDetailPage = React.lazy(() => retryLoadComponent(() => import('./pages/DomainDetail')));
const ProfilePage = React.lazy(() => retryLoadComponent(() => import('./pages/Profile')));
const SettingsPage = React.lazy(() => retryLoadComponent(() => import('./pages/Settings')));

// Chain configuration
const { chains, publicClient, webSocketPublicClient } = configureChains(
  SUPPORTED_CHAINS,
  [publicProvider()]
);

// Wagmi configuration
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'ENS Manager',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const App = memo(() => {
  console.log('App rendering started');

  try {
    const location = useLocation();
    const { isConnected, address } = useAccount();
    const windowSize = useWindowSize();
    const isOnline = useNetworkStatus();
    const systemPrefersDark = useThemeDetector();
    console.log('Hooks initialized successfully');
  } catch (error) {
    console.error('Hook initialization failed:', error);
  }

  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'light');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        // Add initialization logic here
        await Promise.all([
          // Add your initialization promises here
        ]);
        analytics.trackEvent('app_initialized');
      } catch (error) {
        ErrorLogger.captureError(error);
        toast.error('Failed to initialize app');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (!savedTheme && systemPrefersDark) {
      setTheme('dark');
    }
  }, [systemPrefersDark]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('app-theme', newTheme);
      return newTheme;
    });
  }, []);

  // Network status management
  useEffect(() => {
    if (!isOnline) {
      toast.error('You are offline. Please check your internet connection.');
    }
  }, [isOnline]);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  return (
    <WagmiConfig config={config}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <ErrorBoundary>
          <ENSProvider>
            <EASProvider>
              <TransactionFlowProvider>
                <AppWrapper>
                  <ProgressBar />
                  <Header 
                    onThemeToggle={toggleTheme} 
                    isDarkMode={theme === 'dark'}
                    isConnected={isConnected}
                    address={address}
                    windowSize={windowSize}
                  />
                  
                  <MainContent>
                    <Suspense fallback={<LoadingSpinner />}>
                      <PageTransition>
                        <Routes location={location}>
                          <Route path="/" element={<HomePage />} />
                          <Route 
                            path="/domain/:domainName/*" 
                            element={
                              <ProtectedRoute isConnected={isConnected}>
                                <DomainDetailPage />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="/eas/*" 
                            element={
                              <ProtectedRoute isConnected={isConnected}>
                                <EASPage />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="/profile" 
                            element={
                              <ProtectedRoute isConnected={isConnected}>
                                <ProfilePage />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="/settings" 
                            element={
                              <ProtectedRoute isConnected={isConnected}>
                                <SettingsPage />
                              </ProtectedRoute>
                            } 
                          />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </PageTransition>
                    </Suspense>
                  </MainContent>

                  <Footer />
                  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </AppWrapper>
              </TransactionFlowProvider>
            </EASProvider>
          </ENSProvider>
        </ErrorBoundary>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
        <Analytics />
      </ThemeProvider>
    </WagmiConfig>
  );
});

App.displayName = 'App';

export default App;
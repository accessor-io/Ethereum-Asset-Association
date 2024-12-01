import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../constants';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './common/ErrorBoundary';
import LoadingSpinner from './common/LoadingSpinner';
import Card from './common/Card';
import Modal from './common/Modal';
import Button from './common/Button';
import ProgressBar from './common/ProgressBar';

const Layout = ({ children, isLoading }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [networkInfo, setNetworkInfo] = useState({ chainId: '', name: '' });
  const [gasPrice, setGasPrice] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);

  // Theme handling
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  // Mock network monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock notification system
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200`}>
      <ErrorBoundary>
        <Header 
          onThemeToggle={handleThemeToggle}
          isDarkMode={isDarkMode}
          isConnected={isConnected}
          address={address}
          className="sticky top-0 z-50 backdrop-blur-sm bg-white/75 dark:bg-gray-900/75"
        />
        
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(({ id, message, type }) => (
            <div
              key={id}
              className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                type === 'error' ? 'bg-red-500 dark:bg-red-600' :
                type === 'success' ? 'bg-green-500 dark:bg-green-600' :
                'bg-blue-500 dark:bg-blue-600'
              } text-white backdrop-blur-sm bg-opacity-90`}
            >
              {message}
            </div>
          ))}
        </div>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Toggle for Mobile */}
                <button
                  className="lg:hidden fixed bottom-4 right-4 bg-primary hover:bg-primary-dark p-3 rounded-full shadow-lg z-40 text-white transition-transform duration-200 hover:scale-110 active:scale-95"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? '←' : '→'}
                </button>

                {/* Sidebar */}
                <div className={`lg:col-span-3 space-y-6 transition-all duration-300 transform ${
                  sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100'
                }`}>
                  {/* Navigation Card */}
                  <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <nav className="space-y-2 p-4">
                      <a href="/domains" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                        <span className="mr-3 text-lg">🔍</span>
                        <span className="font-medium">Domain Search</span>
                      </a>
                      <a href="/records" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                        <span className="mr-3 text-lg">📝</span>
                        <span className="font-medium">Records</span>
                      </a>
                      <a href="/subdomains" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                        <span className="mr-3 text-lg">🌐</span>
                        <span className="font-medium">Subdomains</span>
                      </a>
                      <a href="/resolver" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                        <span className="mr-3 text-lg">🔗</span>
                        <span className="font-medium">Resolver</span>
                      </a>
                      <a href="/reverse-records" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                        <span className="mr-3 text-lg">↩️</span>
                        <span className="font-medium">Reverse Records</span>
                      </a>
                      {isConnected && (
                        <>
                          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
                          <a href="/profile" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                            <span className="mr-3 text-lg">👤</span>
                            <span className="font-medium">Profile</span>
                          </a>
                          <a href="/settings" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200">
                            <span className="mr-3 text-lg">⚙️</span>
                            <span className="font-medium">Settings</span>
                          </a>
                        </>
                      )}
                    </nav>
                  </Card>

                  {/* Network Status Card */}
                  <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Network Status</h3>
                        <Button
                          onClick={() => setShowNetworkModal(true)}
                          className="px-3 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-200"
                        >
                          Details
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <span className={`h-3 w-3 rounded-full ${
                            isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                          } mr-3`}></span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isConnected ? 'Connected' : 'Not Connected'}
                          </span>
                        </div>
                        {isConnected && (
                          <>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {address.slice(0, 6)}...{address.slice(-4)}
                              </span>
                              <button className="text-primary hover:text-primary-dark transition-colors duration-200">
                                Copy
                              </button>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Network: <span className="font-medium">{networkInfo.name || 'Unknown'}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Gas Price: <span className="font-medium">{gasPrice || 'Loading...'}</span>
                            </div>
                          </>
                        )}
                        <div className="pt-4">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Sync Progress</span>
                            <span>{syncProgress}%</span>
                          </div>
                          <ProgressBar 
                            progress={syncProgress} 
                            className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                            barClassName="h-full bg-primary transition-all duration-300 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Actions Card */}
                  <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => addNotification('Feature coming soon!')}
                          className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                          Register
                        </Button>
                        <Button 
                          onClick={() => addNotification('Feature coming soon!')}
                          className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                          Transfer
                        </Button>
                        <Button 
                          onClick={() => addNotification('Feature coming soon!')}
                          className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                          Update
                        </Button>
                        <Button 
                          onClick={() => addNotification('Feature coming soon!')}
                          className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                          Extend
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9">
                  <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6">
                    <div className="space-y-8">
                      {children}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer className="mt-auto bg-white dark:bg-gray-900 shadow-lg" />

        {/* Network Details Modal */}
        {showNetworkModal && (
          <Modal 
            onClose={() => setShowNetworkModal(false)}
            className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Network Details</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Chain ID</label>
                    <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                      {networkInfo.chainId || 'Not Available'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Network Name</label>
                    <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                      {networkInfo.name || 'Not Available'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gas Price</label>
                    <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                      {gasPrice || 'Not Available'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <p className={`mt-1 text-lg font-medium ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowNetworkModal(false)}
                  className="w-full mt-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Layout; 
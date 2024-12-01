import React from 'react';
import { useAccount } from 'wagmi';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Suspense } from 'react';

export const MainLayout = ({ children, onThemeToggle, isDarkMode }) => {
  console.log('MainLayout rendering', { isDarkMode });
  const { isConnected, address } = useAccount();
  console.log('Wallet status:', { isConnected, address });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header 
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
        isConnected={isConnected}
        address={address}
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        }>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}; 
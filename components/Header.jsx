import React from 'react';
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';

const Header = ({ onThemeToggle, isDarkMode, isConnected, address }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-gray-800/95">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">ENS Manager</Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/domains" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">Domains</Link>
            <Link to="/eas" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">EAS</Link>
            {isConnected && (
              <>
                <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">Profile</Link>
                <Link to="/settings" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">Settings</Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onThemeToggle}
            className="rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <ConnectButton isConnected={isConnected} address={address} />
        </div>
      </div>
    </header>
  );
};

export default Header; 
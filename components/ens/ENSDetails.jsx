import React from 'react';

export const ENSDetails = ({ name, isAvailable, onRegister, isLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{name}</h3>
      <div className="space-y-2">
        <p>
          Status:{' '}
          <span className={isAvailable ? 'text-green-500' : 'text-red-500'}>
            {isAvailable ? 'Available' : 'Not Available'}
          </span>
        </p>
        {isAvailable && (
          <button
            onClick={onRegister}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        )}
      </div>
    </div>
  );
}; 
import React from 'react';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 h-10 w-10 ${className}`}
      />
    </div>
  );
};

export default LoadingSpinner; 
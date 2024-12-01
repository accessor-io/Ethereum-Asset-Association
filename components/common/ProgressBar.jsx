import React from 'react';

const ProgressBar = ({ progress, className = '', barClassName = '' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${className}`}>
      <div
        className={`bg-blue-500 rounded-full transition-all duration-300 ${barClassName}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar; 
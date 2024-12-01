import React from 'react';

const Modal = ({ children, onClose, className = '' }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 
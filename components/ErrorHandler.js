import React from 'react';

const ErrorHandler = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error-message">
      <h3>An error occurred:</h3>
      <p>{error.message}</p>
      {error.code && <p>Error code: {error.code}</p>}
    </div>
  );
};

export default ErrorHandler;
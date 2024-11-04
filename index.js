import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root element:', document.getElementById('root')); // Debug log

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


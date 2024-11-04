import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, isConnected }) => {
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }
  return children;
}; 
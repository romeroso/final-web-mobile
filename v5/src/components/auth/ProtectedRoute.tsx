import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  
  if (!state.isAuthenticated) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  // User is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
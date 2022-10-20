import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/App/appContext';

const ProtectedRoute = ({ children }) => {
  const AppContext = useAppContext();
  const { user } = AppContext;
  const location = useLocation();

  if (!user) {
    return <Navigate to='/landing' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

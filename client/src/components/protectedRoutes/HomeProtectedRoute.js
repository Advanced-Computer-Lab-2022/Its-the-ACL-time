import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

const HomeProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    }
  }, [user, location, navigate]);

  return children;
};

export default HomeProtectedRoute;

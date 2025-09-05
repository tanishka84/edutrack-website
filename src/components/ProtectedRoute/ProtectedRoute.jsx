// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // 1. Check if user is logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Check if the user's role is allowed to see this page
  const isAllowed = allowedRoles.includes(user.role);

  // 3. If allowed, render the page. Otherwise, redirect to the main dashboard.
  return isAllowed ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
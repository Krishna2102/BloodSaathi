import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('role'); // Retrieve user role from localStorage

  // Check if the user role matches one of the allowed roles for this route
  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    // Redirect to home or any appropriate route if not authorized
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
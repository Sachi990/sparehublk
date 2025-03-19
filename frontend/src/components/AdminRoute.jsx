import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AdminRoute = ({ children }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode the token to check the user role
    const decoded = jwt_decode(token);
    
    // If the role is 'admin', render the protected component(s)
    if (decoded.role === 'admin') {
      return children;
    } else {
      // If the role is not admin, redirect to home page
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error('Token error:', error);
    // If there's an error decoding the token, redirect to login page
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;

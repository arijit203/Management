import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error('Token decoding error:', error);
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;

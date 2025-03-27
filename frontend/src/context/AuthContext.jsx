// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,    // Contains decoded user information
    token: null,   // JWT token
    role: null,    // e.g. 'user' or 'admin'
  });

  // On mount, check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          user: decoded,
          token,
          role: decoded.role || 'user',
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
        setAuth({ user: null, token: null, role: null });
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setAuth({
        user: decoded,
        token,
        role: decoded.role || 'user',
      });
    } catch (error) {
      console.error('Error decoding token during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

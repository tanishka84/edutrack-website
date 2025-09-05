// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // No user is logged in initially

  // The login function will accept some mock user data and set it in our state
  const login = (userData) => {
    setUser(userData);
  };

  // The logout function will clear the user data
  const logout = () => {
    setUser(null);
  };

  // The value provided to the context consumers
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
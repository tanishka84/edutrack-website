// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Some initial mock activities to make the feed look populated
const initialMockActivities = [
    {
        id: 1,
        user: 'Priya Sharma',
        action: 'submitted assignment',
        target: 'Project Proposal',
        timestamp: new Date('2025-09-04T10:30:00Z')
    },
    {
        id: 2,
        user: 'Rajesh Kumar',
        action: 'graded assignment',
        target: 'Mid-term Exam',
        timestamp: new Date('2025-09-03T15:00:00Z')
    }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState(initialMockActivities); // <-- Add activities state

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };


  const logActivity = (activity) => {
    const newActivity = { ...activity, id: Date.now(), timestamp: new Date() };
    setActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  const value = {
    user,
    login,
    logout,
    activities,   // <-- Expose activities
    logActivity,  // <-- Expose the new function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
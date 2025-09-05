// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// General Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import AssignmentsPage from './pages/AssignmentsPage'; 
import ProgressPage from './pages/ProgressPage';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Routes>
      {/* Routes for the main site (without sidebar) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Nested routes for the dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="assignments" element={<AssignmentsPage />} /> 
        <Route path="progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  );
}

export default App;
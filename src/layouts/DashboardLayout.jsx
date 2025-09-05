// src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

// This component will wrap all our dashboard pages
const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main>
          {/* Outlet is a placeholder where the nested route component will be rendered */}
          <Outlet /> 
        </main>
      </div>

      {/* These styles are specific to the dashboard layout */}
      <style jsx global>{`
        .dashboard-layout {
          display: flex;
        }
        .main-content {
          flex-grow: 1;
          transition: margin-left 0.3s ease;
        }
        @media (min-width: 769px) {
          .main-content {
            margin-left: 250px; /* Space for the sidebar */
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
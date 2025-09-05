// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  // A helper function to close the sidebar on mobile after a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
        <nav className={styles.nav}>
          <NavLink to="/dashboard" className={styles.link} onClick={handleLinkClick} end>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/courses" className={styles.link} onClick={handleLinkClick}>
            Courses
          </NavLink>
          <NavLink to="/dashboard/assignments" className={styles.link} onClick={handleLinkClick}>
            Assignments
          </NavLink>
          <NavLink to="/dashboard/progress" className={styles.link} onClick={handleLinkClick}>
            Progress
          </NavLink>
          <NavLink to="/dashboard/profile" className={styles.link} onClick={handleLinkClick}>
            Profile
          </NavLink>
        </nav>
      </aside>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Sidebar;
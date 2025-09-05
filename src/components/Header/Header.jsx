// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'react-feather';
import styles from './Header.module.css';

const Header = ({ onMenuClick }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setDarkMode(!isDarkMode);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          {onMenuClick && (
            <button onClick={onMenuClick} className={styles.menuBtn} aria-label="Open menu">
              <Menu />
            </button>
          )}
          <Link to="/" className={styles.logo}>EduTrack</Link>
        </div>
        <div className={styles.right}>
          <div className={styles.themeSwitcher}>
            <input type="checkbox" id="theme-toggle" checked={isDarkMode} onChange={toggleTheme} className={styles.toggle} />
            <label htmlFor="theme-toggle" className={styles.slider}></label>
          </div>
          <Link to="/auth" className={styles.loginBtn}>Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
// src/components/Interactive/Interactive.jsx
import React from 'react';
import styles from './Interactive.module.css';
import { Search } from 'react-feather';

const Interactive = () => {
  return (
    <section id="interactive" className={styles.interactiveSection}>
      <div className="container">
        <div className={styles.search}>
          <h3 className={styles.title}>Find a Course</h3>
          <div className={styles.searchBox}>
            <input
              type="search"
              placeholder="Search for courses like 'Web Development'..."
              className={styles.input}
            />
            <button className={styles.btn} aria-label="Search">
              <Search size={20} />
            </button>
          </div>
        </div>
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} EduTrack. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Interactive;
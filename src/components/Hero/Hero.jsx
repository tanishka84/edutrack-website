// src/components/Hero/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>Your Learning Journey, Reimagined</h1>
        <p className={styles.subtitle}>
          EduTrack provides the tools you need to succeed in the modern educational landscape.
        </p>
        <div className={styles.actions}>
          <Link to="/auth" className={`${styles.btn} ${styles.primary}`}>
            Get Started
          </Link>
          <a href="#features" className={`${styles.btn} ${styles.secondary}`}>
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
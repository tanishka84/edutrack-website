// src/components/CallToAction/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CallToAction.module.css';

const CallToAction = () => {
  return (
    <section id="cta" className={styles.ctaSection}>
      <div className="container">
        <h2 className={styles.title}>Ready to Transform Your Educational Experience?</h2>
        <p className={styles.subtitle}>
          Join thousands of educators and students who are building the future of learning with EduTrack.
        </p>
        <Link to="/auth" className={styles.btn}>
          Start Your Free Trial
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
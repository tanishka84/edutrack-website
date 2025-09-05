// src/components/Statistics/Statistics.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './Statistics.module.css';

const useOnScreen = (options) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};


const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const duration = 2000;
    const incrementTime = (duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span className={styles.value}>{count.toLocaleString()}+</span>;
};

const Statistics = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
  
  const metrics = [
    { target: 10000, label: "Active Students" },
    { target: 500, label: "Courses Available" },
    { target: 50, label: "Partner Institutions" },
    { target: 99, label: "Satisfaction Rate %" },
  ];

  return (
    <section ref={ref} className={styles.metricsSection}>
      <div className="container">
        <div className={styles.grid}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.card}>
              {isVisible ? <AnimatedCounter target={metric.target} /> : <span className={styles.value}>0</span>}
              <div className={styles.label}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
// src/components/FeaturesDemo/FeaturesDemo.jsx
import React, { useState, useEffect } from 'react';
import styles from './FeaturesDemo.module.css';
import { ChevronLeft, ChevronRight } from 'react-feather';

const slides = [
  {
    image: 'https://via.placeholder.com/900x500/1E40AF/FFFFFF?text=Dashboard',
    caption: 'Intuitive Dashboard',
  },
  {
    image: 'https://via.placeholder.com/900x500/14B8A6/FFFFFF?text=Course+Creation',
    caption: 'Easy Course Creation',
  },
  {
    image: 'https://via.placeholder.com/900x500/6B7280/FFFFFF?text=Analytics',
    caption: 'Powerful Analytics',
  },
];

const FeaturesDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section id="features" className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.title}>See EduTrack in Action</h2>
        <p className={styles.subtitle}>
          Explore the core features that make our platform powerful and easy to use.
        </p>
        <div className={styles.slider}>
          <div className={styles.wrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className={styles.slide}>
                <img src={slide.image} alt={slide.caption} loading="lazy" />
                <div className={styles.caption}>{slide.caption}</div>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className={`${styles.btn} ${styles.prev}`} aria-label="Previous slide">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className={`${styles.btn} ${styles.next}`} aria-label="Next slide">
            <ChevronRight size={24} />
          </button>
          <div className={styles.dots}>
            {slides.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesDemo;
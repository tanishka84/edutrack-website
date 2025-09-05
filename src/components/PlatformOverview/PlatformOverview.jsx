// src/components/PlatformOverview/PlatformOverview.jsx
import React from 'react';
import styles from './PlatformOverview.module.css';
import { BookOpen, Users, Edit3 } from 'react-feather';

const cardData = [
  {
    icon: <BookOpen size={24} />,
    title: 'Course Management',
    text: 'Create, organize, and deliver engaging course content with our intuitive builder.',
  },
  {
    icon: <Users size={24} />,
    title: 'Student Tracking',
    text: 'Monitor student progress, grades, and engagement with powerful analytics.',
  },
  {
    icon: <Edit3 size={24} />,
    title: 'Assessment Tools',
    text: 'Design quizzes, assignments, and exams with a variety of question types and settings.',
  },
];

const PlatformOverview = () => {
  return (
    <section id="overview" className={styles.overviewSection}>
      <div className="container">
        <h2 className={styles.title}>A Unified Platform for Education</h2>
        <p className={styles.subtitle}>
          Everything you need to manage courses, track progress, and foster collaboration.
        </p>
        <div className={styles.grid}>
          {cardData.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
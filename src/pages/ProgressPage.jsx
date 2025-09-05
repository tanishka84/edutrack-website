// src/pages/ProgressPage.jsx
import React from 'react';
import styles from './ProgressPage.module.css';
import { Download } from 'react-feather';

const mockGrades = [
  { course: 'Introduction to Web Development', grade: 'A-', status: 'Completed' },
  { course: 'Advanced React Patterns', grade: 'B+', status: 'In Progress' },
  { course: 'UI/UX Design Principles', grade: 'A', status: 'Completed' },
  { course: 'Data Structures & Algorithms', grade: 'C+', status: 'In Progress' },
];

const ProgressPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Overall Progress</h1>
        <button className={styles.btn}>
          <Download size={16} />
          <span>Download Report</span>
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.gradeTable}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockGrades.map((item, index) => (
              <tr key={index}>
                <td>{item.course}</td>
                <td>{item.grade}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressPage;
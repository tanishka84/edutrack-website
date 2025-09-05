// src/pages/DashboardPage.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import styles from './DashboardPage.module.css';

// Helper to format the time since an activity happened
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const DashboardPage = () => {
  const { user, activities } = useAuth(); // <-- Get user and activities

  // Filter activities based on user role
  const filteredActivities = useMemo(() => {
    if (!user || !activities) return [];
    if (user.role === 'Student') {
      // Students see only their own activity
      return activities.filter(act => act.user === user.name);
    }
    // Instructors and Admins see all activity
    return activities;
  }, [user, activities]);

  return (
    <div className={styles.dashboardMain}>
      <h1>Welcome back, {user?.name}!</h1> {/* Personalized greeting */}
      <div className={styles.dashboardGrid}>
        <Link to="/dashboard/courses" className={styles.statLink}>
          <div className={styles.statWidget}>
            <h2 className={styles.statWidgetTitle}>Courses Enrolled</h2>
            <p className={styles.statWidgetValue}>5</p>
          </div>
        </Link>
        <Link to="/dashboard/assignments" className={styles.statLink}>
          <div className={styles.statWidget}>
            <h2 className={styles.statWidgetTitle}>Assignments Due</h2>
            <p className={styles.statWidgetValue}>2</p>
          </div>
        </Link>
        <Link to="/dashboard/progress" className={styles.statLink}>
          <div className={styles.statWidget}>
            <h2 className={styles.statWidgetTitle}>Overall Progress</h2>
            <p className={styles.statWidgetValue}>76%</p>
          </div>
        </Link>

        {/* --- DYNAMIC ACTIVITY FEED --- */}
        <div className={`${styles.contentCard} ${styles.fullWidth}`}>
          <h2 className={styles.contentCardTitle}>Recent Activity</h2>
          {filteredActivities.length > 0 ? (
            <ul className={styles.activityList}>
              {filteredActivities.map(activity => (
                <li key={activity.id} className={styles.activityItem}>
                  <p className={styles.activityText}>
                    <strong>{user.role === 'Student' ? 'You' : activity.user}</strong> {activity.action} <strong>'{activity.target}'</strong>
                  </p>
                  <span className={styles.activityTime}>{timeSince(activity.timestamp)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity.</p>
          )}
        </div>
        {/* --------------------------- */}

      </div>
    </div>
  );
};

export default DashboardPage;
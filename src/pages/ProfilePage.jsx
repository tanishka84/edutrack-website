// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!user || !formData) {
    return (
      <div className={styles.page}>
        <h1>Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Simulating save with new data:', formData);
    alert("Profile changes saved (simulation)!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>User Profile</h1>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
            <div>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className={`${styles.btn} ${styles.primaryBtn}`}>
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
            </div>
            <div className={styles.actions}>
              <button type="submit" className={`${styles.btn} ${styles.primaryBtn}`}>Save Changes</button>
              <button type="button" onClick={handleCancel} className={`${styles.btn} ${styles.secondaryBtn}`}>Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <p>{user.name}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Bio</label>
              <p>{user.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
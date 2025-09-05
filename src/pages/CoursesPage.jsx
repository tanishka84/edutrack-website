// src/pages/CoursesPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // <-- 1. Import useAuth
import styles from './CoursesPage.module.css';
import { Plus, Edit, Trash2 } from 'react-feather';

// ... (The CourseModal and CourseCard sub-components remain the same) ...
// The Modal Form for Creating/Editing
const CourseModal = ({ course, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: 'https://via.placeholder.com/400x225/6B7280/FFFFFF?text=New+Course',
    progress: 0,
  });

  useEffect(() => {
    // If we are editing a course, populate the form with its data
    if (course) {
      setFormData(course);
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle number input for progress
    const parsedValue = name === 'progress' ? parseInt(value, 10) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        <h2>{course ? 'Edit Course' : 'Create New Course'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Progress (%)</label>
            <input type="number" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange} />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={`${styles.btn} ${styles.secondaryBtn}`}>Cancel</button>
            <button type="submit" className={`${styles.btn} ${styles.primaryBtn}`}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// The card for displaying a single course
const CourseCard = ({ course, onEdit, onDelete, canManage }) => (
  <div className={styles.card}>
    <img src={course.image} alt={course.title} className={styles.cardImage} />
    <div className={styles.cardContent}>
      <h2 className={styles.cardTitle}>{course.title}</h2>
      <p className={styles.cardDescription}>{course.description}</p>
      <div className={styles.progressContainer}>
        <div className={styles.progressLabel}>
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressBarFill} style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>
      {/* --- Conditionally render actions based on the canManage prop --- */}
      {canManage && (
        <div className={styles.cardActions}>
          <button onClick={() => onEdit(course)} className={styles.actionBtn}><Edit size={16} /> Edit</button>
          <button onClick={() => onDelete(course.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash2 size={16} /> Delete</button>
        </div>
      )}
    </div>
  </div>
);


const initialCoursesData = [
    { id: 1, title: 'Introduction to Web Development', description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80', progress: 75, },
    { id: 2, title: 'Advanced React Patterns', description: 'Dive deep into React hooks, state management, and performance optimization.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80', progress: 45, },
    { id: 3, title: 'UI/UX Design Principles', description: 'Master the core principles of user interface and user experience design.', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80', progress: 90, },
];

const CoursesPage = () => {
  const { user } = useAuth(); // <-- 2. Get the current user from context
  const [courses, setCourses] = useState(initialCoursesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // --- 3. Determine if the user has permission to manage courses ---
  const canManageCourses = user && (user.role === 'Admin' || user.role === 'Instructor');

  // ... (handler functions remain the same)
  const handleOpenCreateModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCourse = (courseData) => {
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map(c => (c.id === editingCourse.id ? { ...c, ...courseData } : c)));
    } else {
      // Create new course
      const newCourse = { ...courseData, id: Date.now() }; // Use timestamp for unique ID
      setCourses([...courses, newCourse]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>My Courses</h1>
        {/* --- 4. Conditionally render the create button --- */}
        {canManageCourses && (
          <button onClick={handleOpenCreateModal} className={`${styles.btn} ${styles.primaryBtn}`}>
            <Plus size={16} /> Create New Course
          </button>
        )}
      </div>
      
      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteCourse}
            canManage={canManageCourses} // <-- Pass permission down
          />
        ))}
      </div>

      {isModalOpen && (
        <CourseModal 
          course={editingCourse}
          onSave={handleSaveCourse}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CoursesPage;
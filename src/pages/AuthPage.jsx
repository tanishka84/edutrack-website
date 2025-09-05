// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';

// --- MOCK USERS WITH ROLES ---
const studentUser = {
  name: 'Priya Sharma',
  email: 'student@edutrack.com',
  role: 'Student',
  bio: 'Frontend developer from Bengaluru, passionate about React and modern web technologies.',
  avatar: 'https://i.pravatar.cc/150?u=priyasharma',
};
const instructorUser = {
  name: 'Rajesh Kumar',
  email: 'instructor@edutrack.com',
  role: 'Instructor',
  bio: 'Senior software engineer with 10+ years of experience in cloud architecture.',
  avatar: 'https://i.pravatar.cc/150?u=rajeshkumar',
};
const adminUser = {
  name: 'Anjali Singh',
  email: 'admin@edutrack.com',
  role: 'Admin',
  bio: 'Head of Engineering at EduTrack. Focused on building scalable learning platforms.',
  avatar: 'https://i.pravatar.cc/150?u=anjalisingh',
};

// The component function itself
const AuthPage = () => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const isSignUpInitial = searchParams.get('mode') === 'signup';
  const [isLoginMode, setIsLoginMode] = useState(!isSignUpInitial);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (isLoginMode) {
        let userToLogin = studentUser;
        if (email.startsWith('instructor')) {
          userToLogin = instructorUser;
        } else if (email.startsWith('admin')) {
          userToLogin = adminUser;
        }
        login({ ...userToLogin, email });
        navigate('/dashboard');
      } else {
        alert('Sign up successful! Please log in.');
        setIsLoginMode(true);
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!isLoginMode && !name) newErrors.name = 'Full name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    return newErrors;
  };
  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
  }, [isLoginMode]);

  return (
    <div className={styles.authPage}>
      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>
          {isLoginMode ? 'Welcome Back' : 'Create an Account'}
        </h1>
        {!isLoginMode && (
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g., student@edutrack.com" />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
        </div>
        <button type="submit" className={styles.btn}>
          {isLoginMode ? 'Login' : 'Create Account'}
        </button>
        <div className={styles.footer}>
          <button type="button" onClick={toggleMode} className={styles.toggleBtn}>
            {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
          <Link to="/">Back to Home</Link>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
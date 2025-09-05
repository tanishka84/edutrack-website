// src/pages/AssignmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './AssignmentsPage.module.css';
import { Plus, Edit, Trash2, Eye } from 'react-feather';

// --- SUB-COMPONENTS ---

// Modal for STUDENTS to submit their work
const SubmissionModal = ({ assignment, onSubmit, onClose }) => {
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(assignment.id, { notes, files: [fileName] });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        <h2>Submit: {assignment.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Submission Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any notes for your instructor..."></textarea>
          </div>
          <div className={styles.formGroup}>
            <label>Upload File(s)</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={`${styles.btn} ${styles.secondaryBtn}`}>Cancel</button>
            <button type="submit" className={`${styles.btn} ${styles.primaryBtn}`}>Confirm Submission</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for INSTRUCTORS/ADMINS to view a submission
const SubmissionViewModal = ({ assignment, onClose }) => {
  const { submission } = assignment;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        <h2>Submission for: {assignment.title}</h2>
        <div className={styles.submissionDetails}>
            <p><strong>Submitted On:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
            <p><strong>Student Notes:</strong></p>
            <p className={styles.notes}>{submission.notes || 'No notes were provided.'}</p>
            <p><strong>Submitted Files:</strong></p>
            <ul>
                {submission.files.map((file, index) => <li key={index}>{file}</li>)}
            </ul>
        </div>
        <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={`${styles.btn} ${styles.primaryBtn}`}>Close</button>
        </div>
      </div>
    </div>
  );
};

const AssignmentModal = ({ assignment, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    status: 'Pending',
  });

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        <h2>{assignment ? 'Edit Assignment' : 'Create New Assignment'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Course</label>
            <input name="course" value={formData.course} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Graded">Graded</option>
            </select>
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

const AssignmentCard = ({ assignment, user, onEdit, onDelete, onOpenSubmitModal, onOpenViewModal }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return styles.pending;
      case 'submitted': return styles.submitted;
      case 'graded': return styles.graded;
      default: return '';
    }
  };

  const canManage = user && (user.role === 'Admin' || user.role === 'Instructor');
  const isSubmitted = assignment.status === 'Submitted' || assignment.status === 'Graded';

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{assignment.title}</h2>
        <span className={`${styles.statusBadge} ${getStatusClass(assignment.status)}`}>
          {assignment.status}
        </span>
      </div>
      <p className={styles.courseName}>{assignment.course}</p>
      <p className={styles.dueDate}>Due: {assignment.dueDate}</p>
      
      <div className={styles.cardActions}>
        {/* Student View */}
        {user.role === 'Student' && (
          <>
            {assignment.status === 'Pending' && <button onClick={() => onOpenSubmitModal(assignment)} className={`${styles.btn} ${styles.primaryBtn}`}>Submit Work</button>}
            {isSubmitted && <button onClick={() => onOpenViewModal(assignment)} className={`${styles.btn} ${styles.secondaryBtn}`}><Eye size={16}/> View Submission</button>}
          </>
        )}
        {/* Admin/Instructor View */}
        {canManage && (
          <>
            {isSubmitted && <button onClick={() => onOpenViewModal(assignment)} className={`${styles.btn} ${styles.secondaryBtn}`}><Eye size={16}/> View Submission</button>}
            <button onClick={() => onEdit(assignment)} className={styles.actionBtn}><Edit size={16} /> Edit</button>
            <button onClick={() => onDelete(assignment.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash2 size={16} /> Delete</button>
          </>
        )}
      </div>
    </div>
  );
};


const initialAssignmentsData = [
  { id: 1, title: 'Project Proposal', course: 'UI/UX Design Principles', dueDate: '2025-09-15', status: 'Submitted', submission: { submittedAt: '2025-09-14T11:00:00Z', notes: 'Here is my project proposal draft.', files: ['proposal_draft.pdf']} },
  { id: 2, title: 'React Hooks Lab', course: 'Advanced React Patterns', dueDate: '2025-09-10', status: 'Pending' },
  { id: 3, title: 'Final Project', course: 'Introduction to Web Development', dueDate: '2025-09-08', status: 'Pending' },
  { id: 4, title: 'Mid-term Exam', course: 'Data Structures & Algorithms', dueDate: '2025-09-01', status: 'Graded', submission: { submittedAt: '2025-09-01T09:00:00Z', notes: 'Completed.', files: ['exam_answers.docx']} },
];

const AssignmentsPage = () => {
  const { user, logActivity } = useAuth();
  const [assignments, setAssignments] = useState(initialAssignmentsData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  const canManageAssignments = user && (user.role === 'Admin' || user.role === 'Instructor');

  // --- Modal Open/Close Handlers ---
  const handleOpenEditModal = (assignment) => { setCurrentAssignment(assignment); setIsEditModalOpen(true); };
  const handleOpenSubmitModal = (assignment) => { setCurrentAssignment(assignment); setIsSubmitModalOpen(true); };
  const handleOpenViewModal = (assignment) => { setCurrentAssignment(assignment); setIsViewModalOpen(true); };
  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsSubmitModalOpen(false);
    setIsViewModalOpen(false);
    setCurrentAssignment(null);
  };

  // --- CRUD Handlers ---
  const handleSaveAssignment = (assignmentData) => {
    if (currentAssignment && currentAssignment.id) {
      setAssignments(assignments.map(a => a.id === currentAssignment.id ? { ...a, ...assignmentData } : a));
    } else {
      const newAssignment = { ...assignmentData, id: Date.now() };
      setAssignments([...assignments, newAssignment]);
    }
    handleCloseModals();
  };
  
  const handleConfirmSubmission = (assignmentId, submissionData) => {
    setAssignments(assignments.map(a => 
      a.id === assignmentId 
      ? { ...a, status: 'Submitted', submission: { ...submissionData, submittedAt: new Date().toISOString() } } 
      : a
    ));
    const assignmentTitle = assignments.find(a => a.id === assignmentId).title;
    logActivity({ user: user.name, action: 'submitted assignment', target: assignmentTitle });
    handleCloseModals();
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Assignments</h1>
        {canManageAssignments && (
          <button onClick={() => { setCurrentAssignment(null); setIsEditModalOpen(true); }} className={`${styles.btn} ${styles.primaryBtn}`}>
            <Plus size={16} /> New Assignment
          </button>
        )}
      </div>
      
      <div className={styles.assignmentList}>
        {assignments.map(assignment => (
          <AssignmentCard 
            key={assignment.id} 
            assignment={assignment} 
            user={user}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteAssignment}
            onOpenSubmitModal={handleOpenSubmitModal}
            onOpenViewModal={handleOpenViewModal}
          />
        ))}
      </div>

      {isEditModalOpen && <AssignmentModal assignment={currentAssignment} onSave={handleSaveAssignment} onClose={handleCloseModals} />}
      {isSubmitModalOpen && <SubmissionModal assignment={currentAssignment} onSubmit={handleConfirmSubmission} onClose={handleCloseModals} />}
      {isViewModalOpen && <SubmissionViewModal assignment={currentAssignment} onClose={handleCloseModals} />}
    </div>
  );
};

export default AssignmentsPage;
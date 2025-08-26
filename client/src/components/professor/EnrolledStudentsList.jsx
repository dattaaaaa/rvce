import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './ProfessorComponents.module.css'; // New dedicated CSS file
import { Save, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const EnrolledStudentsList = ({ course, students: initialStudents, loading }) => {
    const [students, setStudents] = useState([]);
    const [savingStates, setSavingStates] = useState({});

    useEffect(() => {
        // Initialize students with their grades
        const studentsWithGrades = initialStudents.map(student => ({
            ...student,
            grade: student.grade || ''
        }));
        setStudents(studentsWithGrades);
    }, [initialStudents]);


    const handleGradeChange = (studentId, grade) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student._id === studentId ? { ...student, grade } : student
            )
        );
    };

    const handleSaveGrade = async (studentId) => {
        const student = students.find(s => s._id === studentId);
        if (!student) return;

        setSavingStates(prev => ({ ...prev, [studentId]: 'saving' }));

        try {
            await api.post(`/professor/courses/${course._id}/students/${studentId}/grade`, {
                grade: student.grade,
            });
            setSavingStates(prev => ({ ...prev, [studentId]: 'saved' }));
            toast.success(`Grade for ${student.username} saved successfully!`);
        } catch (error) {
            console.error("Failed to save grade", error);
            setSavingStates(prev => ({ ...prev, [studentId]: 'error' }));
            toast.error(`Failed to save grade for ${student.username}.`);
        } finally {
            // Reset state after a few seconds
            setTimeout(() => {
                setSavingStates(prev => ({ ...prev, [studentId]: null }));
            }, 3000);
        }
    };
    
    const handleSaveAllGrades = async () => {
        const promises = students.map(student =>
            api.post(`/professor/courses/${course._id}/students/${student._id}/grade`, {
                grade: student.grade,
            })
        );

        toast.promise(
            Promise.all(promises),
            {
                loading: 'Saving all grades...',
                success: <b>All grades saved successfully!</b>,
                error: <b>Could not save all grades.</b>,
            }
        );
    };

    if (loading) {
        return <div className={styles.loader}></div>;
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div>
                    <h3>Enrolled Students</h3>
                    <span>{course.courseCode} - {course.courseName}</span>
                </div>
                <button onClick={handleSaveAllGrades} className={styles.saveAllButton}>
                    <Save size={18} /> Save All
                </button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Grade</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map(student => (
                            <tr key={student._id}>
                                <td>{student.username}</td>
                                <td>{student.email}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.gradeInput}
                                        value={student.grade}
                                        onChange={(e) => handleGradeChange(student._id, e.target.value)}
                                        placeholder="e.g., A+"
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSaveGrade(student._id)}
                                        className={`${styles.saveButton} ${styles[savingStates[student._id]]}`}
                                        disabled={savingStates[student._id] === 'saving'}
                                    >
                                        {savingStates[student._id] === 'saving' && <div className={styles.spinner}></div>}
                                        {savingStates[student._id] === 'saved' && <CheckCircle size={18} />}
                                        {savingStates[student._id] === 'error' && <AlertCircle size={18} />}
                                        {!savingStates[student._id] && <Save size={18} />}
                                        <span className={styles.buttonText}>
                                            {savingStates[student._id] === 'saving' ? 'Saving...' :
                                             savingStates[student._id] === 'saved' ? 'Saved!' :
                                             savingStates[student._id] === 'error' ? 'Error' : 'Save'}
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className={styles.noStudents}>No students enrolled in this course.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledStudentsList;
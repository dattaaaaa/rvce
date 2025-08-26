import React, { useState } from 'react';
import styles from '../../pages/ProfessorDashboard.module.css';
import api from '../../services/api';

const UploadMarksForm = ({ students, courseId }) => {
    const [grades, setGrades] = useState({});

    const handleGradeChange = (studentId, grade) => {
        setGrades(prev => ({ ...prev, [studentId]: grade }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This endpoint needs to be created on the backend
            await api.post(`/professor/courses/${courseId}/grades`, { grades });
            alert('Grades submitted successfully!');
        } catch (error) {
            console.error('Failed to submit grades', error);
            alert('Error submitting grades.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>USN</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.usn}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <input 
                                        type="text" 
                                        className={styles.gradeInput}
                                        placeholder="e.g., A, B+"
                                        value={grades[student._id] || ''}
                                        onChange={(e) => handleGradeChange(student._id, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.submitContainer}>
                <button type="submit" className={styles.submitButton}>Submit All Grades</button>
            </div>
        </form>
    );
};

export default UploadMarksForm;
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import styles from '../../pages/admin/AdminPages.module.css';

const CourseManagement = ({ courses = [], handleAddCourse, handleDeleteCourse }) => {
    const [newCourse, setNewCourse] = useState({
        courseCode: '', courseName: '', branch: 'AIML', semester: '', year: '', credits: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddCourse(newCourse);
        setNewCourse({ courseCode: '', courseName: '', branch: 'AIML', semester: '', year: '', credits: '' });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.formGrid}>
                <input name="courseCode" value={newCourse.courseCode} onChange={handleChange} placeholder="Course Code (e.g., 22AI51)" required />
                <input name="courseName" value={newCourse.courseName} onChange={handleChange} placeholder="Course Name" required />
                <input name="semester" type="number" value={newCourse.semester} onChange={handleChange} placeholder="Semester" required />
                <input name="year" type="number" value={newCourse.year} onChange={handleChange} placeholder="Year" required />
                <input name="credits" type="number" value={newCourse.credits} onChange={handleChange} placeholder="Credits" required />
                <button type="submit" className={styles.addButton}>Add Course</button>
            </form>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Semester</th>
                            <th>Credits</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course._id}>
                                <td>{course.courseCode}</td>
                                <td>{course.courseName}</td>
                                <td>{course.semester}</td>
                                <td>{course.credits}</td>
                                <td>
                                    <button onClick={() => handleDeleteCourse(course._id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseManagement;
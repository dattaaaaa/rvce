import React from 'react';
import Card from '../common/Card';
import styles from '../../pages/admin/AdminPages.module.css';

const CourseEnrollmentCard = ({ enrollments, loading }) => (
    <Card title="Current Semester Courses">
        {loading ? <p>Loading courses...</p> : (
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Professor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map(enrollment => (
                            <tr key={enrollment._id}>
                                <td>{enrollment.course.courseCode}</td>
                                <td>{enrollment.course.courseName}</td>
                                <td>{enrollment.course.professor?.name || 'Not Assigned'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </Card>
);
export default CourseEnrollmentCard;
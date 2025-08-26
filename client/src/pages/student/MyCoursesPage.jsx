import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import api from '../../services/api';
import styles from '../admin/AdminPages.module.css'; // Re-using admin table styles

const MyCoursesPage = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses/my-courses');
                setEnrollments(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <Layout>
            <Card title="My Enrolled Courses">
                 {loading ? <p>Loading courses...</p> : (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Course Name</th>
                                    <th>Professor</th>
                                    <th>Credits</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map(enroll => (
                                    <tr key={enroll._id}>
                                        <td>{enroll.course.courseCode}</td>
                                        <td>{enroll.course.courseName}</td>
                                        <td>{enroll.course.professor?.name || 'Not Assigned'}</td>
                                        <td>{enroll.course.credits}</td>
                                        <td>{enroll.grade || 'Pending'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </Layout>
    );
};

export default MyCoursesPage;
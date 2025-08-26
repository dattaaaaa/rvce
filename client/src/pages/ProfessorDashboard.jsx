import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import api from '../services/api';
import styles from './ProfessorDashboard.module.css';
import EnrolledStudentsList from '../components/professor/EnrolledStudentsList';

const ProfessorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingStudents, setLoadingStudents] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/professor/courses');
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = async (course) => {
        setSelectedCourse(course);
        setLoadingStudents(true);
        try {
            const { data } = await api.get(`/professor/courses/${course._id}/students`);
            setStudents(data);
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoadingStudents(false);
        }
    };

    return (
        <Layout>
            <div className={styles.dashboardContainer}>
                <div className={styles.sidebar}>
                    <Card>
                        <h3 className={styles.sidebarTitle}>My Courses</h3>
                        {loadingCourses ? <p>Loading...</p> : (
                            <ul className={styles.courseList}>
                                {courses.map(course => (
                                    <li 
                                        key={course._id} 
                                        className={selectedCourse?._id === course._id ? styles.active : ''}
                                        onClick={() => handleCourseSelect(course)}
                                    >
                                        <span className={styles.courseCode}>{course.courseCode}</span>
                                        <span className={styles.courseName}>{course.courseName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
                <div className={styles.mainContent}>
                    {selectedCourse ? (
                        <EnrolledStudentsList 
                            course={selectedCourse}
                            students={students}
                            loading={loadingStudents}
                        />
                    ) : (
                        <div className={styles.placeholder}>
                            <h2>Welcome, Professor!</h2>
                            <p>Select a course from the list on the left to view enrolled students and manage grades.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProfessorDashboard;
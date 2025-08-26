import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import api from '../services/api';
import styles from './ProfessorDashboard.module.css';
import EnrolledStudentsList from '../components/professor/EnrolledStudentsList';
import { FiSearch, FiBook } from 'react-icons/fi'; // Using react-icons for icons

const ProfessorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredCourses = courses.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className={styles.dashboardContainer}>
                <div className={styles.sidebar}>
                    <Card>
                        <div className={styles.sidebarHeader}>
                            <h3 className={styles.sidebarTitle}>My Courses</h3>
                            <div className={styles.searchContainer}>
                                <FiSearch className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className={styles.searchInput}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {loadingCourses ? <div className={styles.loader}></div> : (
                            <ul className={styles.courseList}>
                                {filteredCourses.map(course => (
                                    <li
                                        key={course._id}
                                        className={`${styles.courseItem} ${selectedCourse?._id === course._id ? styles.active : ''}`}
                                        onClick={() => handleCourseSelect(course)}
                                    >
                                        <FiBook className={styles.courseIcon} />
                                        <div className={styles.courseInfo}>
                                            <span className={styles.courseCode}>{course.courseCode}</span>
                                            <span className={styles.courseName}>{course.courseName}</span>
                                        </div>
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
                            <div className={styles.placeholderIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                            </div>
                            <h2>Welcome, Professor!</h2>
                            <p>Select a course from the list to view enrolled students and manage grades.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProfessorDashboard;
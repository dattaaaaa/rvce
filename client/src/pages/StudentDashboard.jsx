import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import CourseEnrollmentCard from '../components/student/CourseEnrollmentCard';
import ResultsDisplay from '../components/student/ResultsDisplay';
import styles from './Dashboard.module.css';
import api from '../services/api';

const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [enrollmentsResponse, resultsResponse] = await Promise.all([
                    api.get('/courses/my-courses'),
                    api.get('/results'),
                ]);
                setEnrollments(enrollmentsResponse.data);
                setResults(resultsResponse.data);
            } catch (error) {
                console.error("Failed to fetch student data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div className={styles.dashboardGrid}>
                <div className={styles.spanTwo}>
                    <ResultsDisplay results={results} loading={loading} />
                </div>
                <CourseEnrollmentCard enrollments={enrollments} loading={loading} />
                {/* Add more student-specific components here */}
            </div>
        </Layout>
    );
};

export default StudentDashboard;
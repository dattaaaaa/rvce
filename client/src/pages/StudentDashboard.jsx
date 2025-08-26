import React from 'react';
import Layout from '../components/common/Layout';
import CourseEnrollmentCard from '../components/student/CourseEnrollmentCard';
import ResultsDisplay from '../components/student/ResultsDisplay';
import styles from './Dashboard.module.css';

const StudentDashboard = () => {
  return (
    <Layout>
      <div className={styles.dashboardGrid}>
        <div className={styles.spanTwo}>
           <ResultsDisplay />
        </div>
        <CourseEnrollmentCard />
        {/* Add more student-specific components here */}
      </div>
    </Layout>
  );
};

export default StudentDashboard;
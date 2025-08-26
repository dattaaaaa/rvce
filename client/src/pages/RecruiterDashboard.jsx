import React from 'react';
import Layout from '../components/common/Layout';
import StudentSearchBar from '../components/recruiter/StudentSearchBar';
import StudentProfileCard from '../components/recruiter/StudentProfileCard';
import styles from './Dashboard.module.css';

const RecruiterDashboard = () => (
  <Layout>
    <div className={styles.dashboardGrid}>
      <StudentSearchBar />
      <StudentProfileCard />
    </div>
  </Layout>
);
export default RecruiterDashboard;
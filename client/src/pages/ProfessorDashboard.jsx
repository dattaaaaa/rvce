// client/src/pages/ProfessorDashboard.jsx
import React from 'react';
import Layout from '../components/common/Layout';
import EnrolledStudentsList from '../components/professor/EnrolledStudentsList';
import UploadMarksForm from '../components/professor/UploadMarksForm';
import styles from './Dashboard.module.css';

const ProfessorDashboard = () => (
  <Layout>
    <div className={styles.dashboardGrid}>
      <EnrolledStudentsList />
      <UploadMarksForm />
    </div>
  </Layout>
);
export default ProfessorDashboard;
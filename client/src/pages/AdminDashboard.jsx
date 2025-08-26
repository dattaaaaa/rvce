// client/src/pages/AdminDashboard.jsx
import React from 'react';
import Layout from '../components/common/Layout';
import UserManagementTable from '../components/admin/UserManagementTable';
import CourseManagement from '../components/admin/CourseManagement';
import styles from './Dashboard.module.css';

const AdminDashboard = () => (
  <Layout>
    <div className={styles.dashboardGrid}>
      <UserManagementTable />
      <CourseManagement />
    </div>
  </Layout>
);
export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import UserManagementTable from '../components/admin/UserManagementTable';
import CourseManagement from '../components/admin/CourseManagement';
import styles from './Dashboard.module.css';
import api from '../services/api';
import Card from '../components/common/Card';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [usersResponse, coursesResponse] = await Promise.all([
                api.get('/users'),
                api.get('/courses'),
            ]);
            setUsers(usersResponse.data);
            setCourses(coursesResponse.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${userId}`);
                fetchData();
            } catch (error) {
                console.error("Failed to delete user", error);
                alert('Failed to delete user.');
            }
        }
    };

    const handleAddCourse = async (courseData) => {
        try {
            await api.post('/courses', courseData);
            fetchData(); // Refresh list
        } catch (error) {
            console.error("Failed to add course", error);
            alert('Failed to add course. Check if the code is unique.');
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This will also remove all student enrollments for it.')) {
            try {
                await api.delete(`/courses/${courseId}`);
                fetchData(); // Refresh list
            } catch (error) {
                console.error("Failed to delete course", error);
                alert('Failed to delete course.');
            }
        }
    };

    if (loading) {
        return <Layout><p>Loading dashboard...</p></Layout>;
    }

    return (
        <Layout>
            <div className={styles.dashboardGrid}>
                <div className={styles.spanTwo}>
                    <Card title="Manage Users">
                        <UserManagementTable users={users} handleDelete={handleDeleteUser} />
                    </Card>
                </div>
                <div className={styles.spanTwo}>
                    <Card title="Manage Courses">
                        <CourseManagement
                            courses={courses}
                            handleAddCourse={handleAddCourse}
                            handleDeleteCourse={handleDeleteCourse}
                        />
                    </Card>
                </div>
            </div>
        </Layout>
    );
};
export default AdminDashboard;
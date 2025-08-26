import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import api from '../../services/api';
import CourseManagement from '../../components/admin/CourseManagement';

const ManageCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const { data } = await api.get('/courses');
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAddCourse = async (courseData) => {
        try {
            await api.post('/courses', courseData);
            fetchCourses(); // Refresh list
        } catch (error) {
            console.error("Failed to add course", error);
            alert('Failed to add course. Check if the code is unique.');
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This will also remove all student enrollments for it.')) {
            try {
                await api.delete(`/courses/${courseId}`);
                fetchCourses(); // Refresh list
            } catch (error) {
                console.error("Failed to delete course", error);
                alert('Failed to delete course.');
            }
        }
    };

    return (
        <Layout>
            <Card title="Manage All Courses">
                {loading ? <p>Loading courses...</p> : (
                    <CourseManagement
                        courses={courses}
                        handleAddCourse={handleAddCourse}
                        handleDeleteCourse={handleDeleteCourse}
                    />
                )}
            </Card>
        </Layout>
    );
};

export default ManageCoursesPage;
import React, { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import api from '../../services/api';
import styles from './Attendance.module.css';
import RegisterFaceModal from '../../components/professor/RegisterFaceModal';
import AttendanceCamera from '../../components/professor/AttendanceCamera';
import { UserPlus, Camera } from 'lucide-react';

const TakeAttendancePage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/professor/courses');
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseChange = async (e) => {
        const courseId = e.target.value;
        setSelectedCourse(courseId);
        if (courseId) {
            setLoading(true);
            try {
                const { data } = await api.get(`/professor/courses/${courseId}/students`);
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                setLoading(false);
            }
        } else {
            setStudents([]);
        }
    };

    const openRegisterModal = (student) => {
        setCurrentStudent(student);
        setIsRegisterModalOpen(true);
    };

    const onRegistrationSuccess = () => {
        setIsRegisterModalOpen(false);
        handleCourseChange({ target: { value: selectedCourse } });
    };
    
    const noRegisteredStudents = students.every(s => !s.faceDescriptor || s.faceDescriptor.length === 0);

    return (
        <Layout>
            <div className={styles.header}>
                <h1>Attendance Management</h1>
                <div className={styles.controls}>
                    <select onChange={handleCourseChange} value={selectedCourse} disabled={isRegisterModalOpen || isAttendanceModalOpen}>
                        <option value="">-- Select a Course --</option>
                        {courses.map(course => <option key={course._id} value={course._id}>{course.courseName} ({course.courseCode})</option>)}
                    </select>
                </div>
            </div>

            {selectedCourse && (
                <Card>
                    <div className={styles.cardHeader}>
                        <h2>Student Roster</h2>
                        <button 
                            onClick={() => setIsAttendanceModalOpen(true)} 
                            className={styles.attendanceButton}
                            disabled={noRegisteredStudents}
                            title={noRegisteredStudents ? 'Register at least one student\'s face to start' : 'Start Attendance Session'}
                        >
                            <Camera size={18} /> Take Attendance
                        </button>
                    </div>
                    {loading ? <p>Loading students...</p> : (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>USN</th>
                                        <th>Name</th>
                                        <th>Face Data Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(student => (
                                        <tr key={student._id}>
                                            <td>{student.usn}</td>
                                            <td>{student.name}</td>
                                            <td>
                                                <span className={student.faceDescriptor && student.faceDescriptor.length > 0 ? styles.registered : styles.notRegistered}>
                                                    {student.faceDescriptor && student.faceDescriptor.length > 0 ? 'Registered' : 'Not Registered'}
                                                </span>
                                            </td>
                                            <td>
                                                <button onClick={() => openRegisterModal(student)} className={styles.registerButton}>
                                                    <UserPlus size={16} />
                                                    <span>{student.faceDescriptor && student.faceDescriptor.length > 0 ? 'Re-register' : 'Register'}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            )}

            {isRegisterModalOpen && currentStudent && (
                <RegisterFaceModal
                    student={currentStudent}
                    onClose={() => setIsRegisterModalOpen(false)}
                    onSuccess={onRegistrationSuccess}
                />
            )}

            {isAttendanceModalOpen && (
                <AttendanceCamera
                    students={students}
                    courseName={courses.find(c => c._id === selectedCourse)?.courseName || ''}
                    onClose={() => setIsAttendanceModalOpen(false)}
                />
            )}
        </Layout>
    );
};

export default TakeAttendancePage;
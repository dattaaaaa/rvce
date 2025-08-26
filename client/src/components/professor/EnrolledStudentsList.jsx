import React from 'react';
import Card from '../common/Card';
import UploadMarksForm from './UploadMarksForm';
import styles from '../../pages/ProfessorDashboard.module.css';

const EnrolledStudentsList = ({ course, students, loading }) => {
    return (
        <Card>
            <div className={styles.cardHeader}>
                <h3>Enrolled Students for {course.courseCode}</h3>
                <span>{course.courseName}</span>
            </div>
            {loading ? <p>Loading students...</p> : (
                <UploadMarksForm students={students} courseId={course._id} />
            )}
        </Card>
    );
};

export default EnrolledStudentsList;
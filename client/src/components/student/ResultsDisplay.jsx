import React from 'react';
import Card from '../common/Card';
import styles from '../../pages/admin/AdminPages.module.css';

const ResultsDisplay = ({ results, loading }) => {
    const calculateSGPA = (semesterResults) => {
        if (!semesterResults || semesterResults.length === 0) return 'N/A';
        const totalCredits = semesterResults.reduce((acc, result) => acc + result.course.credits, 0);
        const weightedSum = semesterResults.reduce((acc, result) => acc + (result.gradePoints * result.course.credits), 0);
        return (weightedSum / totalCredits).toFixed(2);
    };

    const groupedResults = results.reduce((acc, result) => {
        const semester = result.course.semester;
        if (!acc[semester]) {
            acc[semester] = [];
        }
        acc[semester].push(result);
        return acc;
    }, {});

    return (
        <Card title="Academic Results">
            {loading ? <p>Loading results...</p> : (
                Object.keys(groupedResults).sort((a, b) => a - b).map(semester => (
                    <div key={semester} style={{ marginBottom: '2rem' }}>
                        <h4 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                            Semester {semester} - SGPA: {calculateSGPA(groupedResults[semester])}
                        </h4>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Credits</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedResults[semester].map(result => (
                                        <tr key={result._id}>
                                            <td>{result.course.courseCode}</td>
                                            <td>{result.course.courseName}</td>
                                            <td>{result.course.credits}</td>
                                            <td>{result.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            )}
        </Card>
    );
};
export default ResultsDisplay;
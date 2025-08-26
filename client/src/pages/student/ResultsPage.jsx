import React from 'react';
import Layout from '../../components/common/Layout';
import ResultsDisplay from '../../components/student/ResultsDisplay';
import styles from '../Dashboard.module.css'; // Re-using styles for consistency

const ResultsPage = () => {
    return (
        <Layout>
            <div className={styles.dashboardContainer}>
                <header className={styles.dashboardHeader}>
                    <h1>My Results</h1>
                    <p>Here is a summary of your academic performance.</p>
                </header>
                <div className={styles.dashboardContent}>
                    <ResultsDisplay />
                </div>
            </div>
        </Layout>
    );
};

export default ResultsPage;
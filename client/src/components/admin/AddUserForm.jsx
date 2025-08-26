import React, { useState } from 'react';
import styles from '../../pages/admin/AdminPages.module.css';

const AddUserForm = ({ handleAddUser }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        usn: '',
        employeeId: '',
        branch: '',
        year: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddUser(newUser);
        setNewUser({ name: '', email: '', password: '', role: 'student', usn: '', employeeId: '', branch: '', year: '' });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formGrid}>
            <input name="name" value={newUser.name} onChange={handleChange} placeholder="Full Name" required />
            <input name="email" value={newUser.email} onChange={handleChange} placeholder="Email (e.g., name.ai22@rvce.edu.in)" required />
            <input name="password" type="password" value={newUser.password} onChange={handleChange} placeholder="Password" required />
            <select name="role" value={newUser.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="professor">Professor</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
            </select>
            {newUser.role === 'student' && (
                <>
                    <input name="usn" value={newUser.usn} onChange={handleChange} placeholder="USN" required />
                    <input name="branch" value={newUser.branch} onChange={handleChange} placeholder="Branch (e.g., AIML)" required />
                    <input name="year" type="number" value={newUser.year} onChange={handleChange} placeholder="Year" required />
                </>
            )}
            {newUser.role === 'professor' && (
                <input name="employeeId" value={newUser.employeeId} onChange={handleChange} placeholder="Employee ID" required />
            )}
            <button type="submit" className={styles.addButton}>Add User</button>
        </form>
    );
};

export default AddUserForm;
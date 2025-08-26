import React from 'react';
import { Trash2 } from 'lucide-react';
import styles from '../../pages/admin/AdminPages.module.css';

const UserManagementTable = ({ users, handleDelete }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>USN/ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><span className={`${styles.role} ${styles[user.role]}`}>{user.role}</span></td>
                            <td>{user.usn || user.employeeId || 'N/A'}</td>
                            <td>
                                {user.role !== 'admin' && (
                                    <button onClick={() => handleDelete(user._id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementTable;
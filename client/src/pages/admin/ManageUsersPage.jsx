import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import api from '../../services/api';
import UserManagementTable from '../../components/admin/UserManagementTable';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${userId}`);
                // Refetch users after deletion
                fetchUsers();
            } catch (error) {
                console.error("Failed to delete user", error);
                alert('Failed to delete user.');
            }
        }
    };

    return (
        <Layout>
            <Card title="Manage All Users">
                {loading ? <p>Loading users...</p> : (
                    <UserManagementTable users={users} handleDelete={handleDeleteUser} />
                )}
            </Card>
        </Layout>
    );
};

export default ManageUsersPage;
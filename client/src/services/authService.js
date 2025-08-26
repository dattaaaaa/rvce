import api from './api';

const login = async (email, password) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    // The response 'data' will contain user info and token
    return data;
  } catch (error) {
    throw error.response.data.message || 'An error occurred';
  }
};

export const authService = {
  login,
};
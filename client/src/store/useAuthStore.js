import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define a function to parse the user role from email
const getRoleFromEmail = (email) => {
  if (!email || !email.includes('@rvce.edu.in')) return null;
  if (email === 'admin@rvce.edu.in') return 'admin';
  if (email.endsWith('.r@rvce.edu.in')) return 'recruiter';
  
  // Regex to check for student email format like name.branchYY@rvce.edu.in
  const studentRegex = /^[a-zA-Z]+\.[a-zA-Z]{2}\d{2}@rvce\.edu\.in$/;
  if (studentRegex.test(email)) return 'student';
  
  // Otherwise, it's a professor
  return 'professor';
};

// Create the store
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,
      login: (userData, token) => {
        const role = getRoleFromEmail(userData.email);
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
          role: role,
        });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false, role: null }),
    }),
    {
      name: 'auth-storage', // name of the item in storage (must be unique)
    }
  )
);

export default useAuthStore;
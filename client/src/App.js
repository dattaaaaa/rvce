import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PrivateRoute from './components/common/PrivateRoute';
import useAuthStore from './store/useAuthStore';

// Import the functional pages
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageCoursesPage from './pages/admin/ManageCoursesPage';
import MyCoursesPage from './pages/student/MyCoursesPage';

/**
 * A helper component to redirect authenticated users from the root URL ('/')
 * to their specific dashboard based on their role.
 */
function HomeRedirect() {
  const { role, isAuthenticated } = useAuthStore();
  
  // If the user is not authenticated, send them to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect authenticated users based on their role.
  switch (role) {
    case 'admin':
      return <Navigate to="/admin" />;
    case 'student':
      return <Navigate to="/student" />;
    case 'professor':
      return <Navigate to="/professor" />;
    case 'recruiter':
      return <Navigate to="/recruiter" />;
    default:
      // If the role is somehow invalid, log them out and redirect to login.
      return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes Wrapper */}
        <Route element={<PrivateRoute />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsersPage />} />
          <Route path="/admin/courses" element={<ManageCoursesPage />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<MyCoursesPage />} />
          {/* Future student routes can be added here */}
          {/* <Route path="/student/results" element={<ResultsPage />} /> */}
          {/* <Route path="/student/fees" element={<FeesPage />} /> */}

          {/* Professor Routes */}
          <Route path="/professor" element={<ProfessorDashboard />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter" element={<RecruiterDashboard />} />
        </Route>
        
        {/* Root path ('/') redirects based on authentication and role */}
        <Route path="/" element={<HomeRedirect />} />
        
        {/* Fallback for any other unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
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
import TakeAttendancePage from './pages/professor/TakeAttendancePage'; // New Page

/**
 * A helper component to redirect authenticated users from the root URL ('/')
 * to their specific dashboard based on their role.
 */
function HomeRedirect() {
  const { role, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
      return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsersPage />} />
          <Route path="/admin/courses" element={<ManageCoursesPage />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<MyCoursesPage />} />

          {/* Professor Routes */}
          <Route path="/professor" element={<ProfessorDashboard />} />
          <Route path="/professor/attendance" element={<TakeAttendancePage />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter" element={<RecruiterDashboard />} />
        </Route>
        
        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
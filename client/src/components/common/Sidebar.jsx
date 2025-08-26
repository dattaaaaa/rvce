import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { LayoutDashboard, Book, User, Briefcase, LogOut, DollarSign, FileText, Camera } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Sidebar = () => {
  const { role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (role) {
      case 'student':
        return [
          { path: '/student', icon: <LayoutDashboard />, text: 'Dashboard' },
          { path: '/student/courses', icon: <Book />, text: 'My Courses' },
          { path: '/student/results', icon: <FileText />, text: 'Results' },
          { path: '/student/fees', icon: <DollarSign />, text: 'Fee Details' },
        ];
      case 'admin':
        return [
          { path: '/admin', icon: <LayoutDashboard />, text: 'Dashboard' },
          { path: '/admin/users', icon: <User />, text: 'Manage Users' },
          { path: '/admin/courses', icon: <Book />, text: 'Manage Courses' },
        ];
      case 'professor':
        return [
          { path: '/professor', icon: <LayoutDashboard />, text: 'Dashboard' },
          { path: '/professor/attendance', icon: <Camera />, text: 'Take Attendance' }
        ];
      case 'recruiter':
        return [{ path: '/recruiter', icon: <Briefcase />, text: 'Find Students' }];
      default:
        return [];
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/rvce_logo.png" alt="RVCE Logo" />
        <h2>RVCE</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          {getNavLinks().map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? styles.active : '')}
                end={link.path.split('/').length <= 2}
              >
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.logout}>
        <button onClick={handleLogout}>
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
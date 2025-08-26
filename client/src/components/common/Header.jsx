import React from 'react';
import styles from './Header.module.css';
import { Bell, UserCircle } from 'lucide-react'; // Using lucide-react for icons

const Header = () => {
  // Mock user data - this will come from auth context later
  const userName = "Vishnu S";
  const userRole = "Student";

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <h1>RVCE Campus Portal</h1>
      </div>
      <div className={styles.headerMenu}>
        <button className={styles.iconButton}>
          <Bell size={20} />
        </button>
        <div className={styles.userInfo}>
          <UserCircle size={36} />
          <div className={styles.userDetails}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userRole}>{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
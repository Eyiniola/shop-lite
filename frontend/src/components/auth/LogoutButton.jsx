import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';

function LogoutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.button}>
      Logout
    </button>
  );
}

export default LogoutButton;

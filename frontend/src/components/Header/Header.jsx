import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styles from './Header.module.css';

function Header({ user, setUser }) {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <LogoutButton setUser={setUser} />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../images/logo.png';
import BackButton from '../backButton/BackButton';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const ShowBackButton = () => {
    return location.pathname !== '/';
  };

  return (
    <header style={styles.header}>
      {ShowBackButton() && <BackButton />}
      <Link to="/" style={styles.logoLink}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>VuLPES</h1>
      </Link>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          {!user && (
            <li style={styles.navItem}>
              <Link to="/login" style={styles.navLink}>Login</Link>
            </li>
          )}
          {user && user.role === 'admin' && (
            <li style={styles.navItem}>
              <Link to="/admin" style={styles.navLink}>Admin Panel</Link>
            </li>
          )}
          {user && (
            <li style={styles.navItem}>
              <button onClick={logout} style={styles.logoutButton}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    borderBottom: '2px solid #FFA500',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#FFA500',
  },
  logo: {
    marginLeft: '125px',
    marginRight: '10px',
    width: '50px',
    height: '50px',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    color: '#FFA500',
    justifyContent: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#FFA500',
    fontSize: '16px',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#FFA500',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'underline'
  }
};

export default Header;

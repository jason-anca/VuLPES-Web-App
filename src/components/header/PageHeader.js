import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png'; 
import BackButton from '../backButton/BackButton';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldShowBackButton = () => {
    return location.pathname !== '/';
  };

  return (
    <header style={styles.header}>
      {shouldShowBackButton() && <BackButton />}
      <Link to="/" style={styles.logoLink}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>VuLPES</h1>
      </Link>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/login" style={styles.navLink}>Login</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/signup" style={styles.navLink}>Sign Up</Link>
          </li>
          {/* Add more navigation links as needed */}
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
    backgroundColor: '#333', // Dark background
    borderBottom: '2px solid #FFA500', // Orange border
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#FFA500', // Orange text for the application name
  },
  logo: {
    marginRight: '10px',
    width: '50px', // Adjust size as needed
    height: '50px', // Adjust size as needed
  },
  title: {
    margin: 0,
    color: '#FFA500', // Ensure the title also adheres to the color scheme
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
    color: '#FFA500', // Orange links
    fontSize: '16px',
  },
};

export default Header;
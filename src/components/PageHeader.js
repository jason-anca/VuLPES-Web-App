// Header.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

function Header({ authenticated, setAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (authenticated) {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false); // Set authenticated state to false
  };

  const headerStyle = {
    backgroundColor: '#fc9003', // Set background color of the header
    color: '#fff', // Set text color
    padding: '10px', // Add padding
    display: 'flex', // Use flexbox for layout
    justifyContent: 'space-between', // Align items with space between
    alignItems: 'center', // Center align items vertically
    fontSize: '52px', // Set font size
    fontWeight: 'bold', // Set font weight
    fontFamily: 'Ubuntu Light, sans-serif' // Set font family
  };

  return (
    <header style={headerStyle}>
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="VuLPES Logo" width="75" height="75" />
        <span style={{ marginLeft: '10px' }}>VuLPES</span>
      </div>
      {authenticated && location.pathname === '/dashboard' && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
}
export default Header;

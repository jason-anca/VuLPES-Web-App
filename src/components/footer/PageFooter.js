// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.text}>© 2024 VuLPES. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333', // Dark background to match the theme
    color: '#FFA500', // Orange text color for consistency
    padding: '20px 0',
    marginTop: '20px',
    position: 'relative',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  content: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '0 20px',
  },
  text: {
    margin: '0',
  },
};

export default Footer;

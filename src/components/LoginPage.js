import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);

    console.log('Attempting login with:', username, password); // Debugging output
    console.log('User found:', user); // Debugging output

    if (user) {
      setUser({ username: user.username, role: user.role });
      localStorage.setItem('user', JSON.stringify({ username: user.username, role: user.role }));
      if (user.role === 'admin') {
        navigate('/admin'); // Redirect to Admin Panel if user is an admin
      } else {
        navigate('/'); // Redirect to homepage or other appropriate page for non-admin users
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.page}>
      <div style={{ maxWidth: '300px', margin: '20px auto' }}>
        <h2 style={{ color: '#FFA500' }}>Login</h2>
        <div style={{ marginBottom: '20px' }}>
          <label style={styles.labelStyle}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.inputStyle}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={styles.labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.inputStyle}
          />
        </div>
        <button onClick={handleLogin} style={styles.buttonStyle}>Login</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    color: '#FFA500',
    backgroundColor: '#333',
    padding: '20px',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    backgroundColor: '#222',
    borderColor: '#FFA500',
    color: '#FFA500',
    outline: 'none'
  },
  buttonStyle: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FFA500',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  labelStyle: {
    display: 'block',
    marginBottom: '5px',
    color: '#FFA500'
  }
};

export default LoginPage;

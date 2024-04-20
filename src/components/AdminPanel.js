import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState('teacher');

  const handleCreateUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(u => u.username === newUsername)) {
      users.push({ username: newUsername, password: newPassword, role });
      localStorage.setItem('users', JSON.stringify(users));
      alert('User created successfully!');
      setNewUsername('');
      setNewPassword('');
    } else {
      alert('Username already exists!');
    }
  };

  if (!user || user.role !== 'admin') {
    return <div style={styles.page}><h2 style={styles.title}>Access Denied</h2></div>;
  }

  return (
    <div style={styles.page}>
      <div style={{ maxWidth: '300px', margin: 'auto' }}>
        <h1 style={styles.title}>Admin Panel</h1>
        <div style={styles.formGroup}>
          <label style={styles.labelStyle}>Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Username"
            style={styles.inputStyle}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.labelStyle}>Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
            style={styles.inputStyle}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.labelStyle}>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.selectStyle}>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button onClick={handleCreateUser} style={styles.buttonStyle}>Create User</button>
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
  formGroup: {
    marginBottom: '15px'
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
  selectStyle: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#333',
    borderColor: '#FFA500',
    color: '#FFA500',
    outline: 'none',
    cursor: 'pointer'
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
  title: {
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: '20px'
  },
  labelStyle: {
    display: 'block',
    marginBottom: '5px',
    color: '#FFA500'
  }
};

export default AdminPanel;

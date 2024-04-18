import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://2v9bujq237.execute-api.eu-west-1.amazonaws.com/prod/login', {
                username,
                password
            });
            localStorage.setItem('token', data.token);
            console.log('Login successful!');
            // Redirect user or perform other actions
        } catch (err) {
            setError('Failed to login');
            console.error('Login failed:', err.response ? err.response.data.error : "Server error");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default LoginForm;

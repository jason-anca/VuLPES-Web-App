import React, { useState } from 'react';
import { signUp } from '@aws-amplify/auth'; // Correctly import signUp

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '', // Assuming collecting email as an additional attribute
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, email } = formData;
        try {
            await signUp({
                username: email, // Use email as the username if "email" is the only required attribute
                password,
                attributes: {
                    email, // Explicitly set the email in attributes as well
                    // No need to pass "username" here since it's used as the Cognito "username"
                },
            });
            console.log('Sign up successful!');
            // Proceed with user confirmation or redirection as needed
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message || JSON.stringify(error));
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;

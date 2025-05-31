import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (forgot) {
      const userIndex = users.findIndex(user => user.username === username);
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Password updated successfully!');
        setForgot(false);
        setUsername('');
        setNewPassword('');
      } else {
        alert('Username not found.');
      }
    } else if (isSignup) {
      const exists = users.find(user => user.username === username);
      if (exists) {
        alert('Username already exists');
        return;
      }
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful! Please log in.');
      setIsSignup(false);
      setUsername('');
      setPassword('');
    } else {
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        navigate('/Entry');
      } else {
        alert('Invalid credentials or user does not exist.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>{forgot ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!forgot ? (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          ) : (
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">
            {forgot ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {!forgot && (
          <>
            <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer' }}>
              {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
            </p>
            <p onClick={() => { setForgot(true); setIsSignup(false); }} style={{ cursor: 'pointer', color: 'blue' }}>
              Forgot Password?
            </p>
          </>
        )}
        {forgot && (
          <p onClick={() => setForgot(false)} style={{ cursor: 'pointer', color: 'blue' }}>
            Back to Login
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
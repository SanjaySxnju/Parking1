import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (forgot) {
        alert('Reset password with DB is not implemented.');
        return;
      }
      if (isSignup) {
        const res = await axios.post('http://localhost:5000/api/user/register', { username, password });
        alert(res.data.message);
        setIsSignup(false);
        setUsername(''); setPassword('');
      } else {
        const res = await axios.post('http://localhost:5000/api/user/login', { username, password });
        alert(res.data.message);
        navigate('/Entry');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>{forgot ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          {!forgot ? (
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          ) : (
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          )}
          <button type="submit">{forgot ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}</button>
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
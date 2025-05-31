import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Welcome to <br />Vehicle Parking Management System</h1>
        <div className="home-links">
          <button onClick={() => navigate('/Login')}>Login</button>
          <button onClick={() => navigate('/Dashboard')}>Dashboard</button>
          
          <button onClick={() => navigate('/Exit')}>Vehicle Exit</button>
          <button onClick={() => navigate('/CheckSlot')}>CheckSlot</button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Exit.css';

const Exit = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exitTime = new Date().toLocaleTimeString();

    try {
      const res = await axios.put('http://localhost:5000/api/exit', {
        vehicleNumber,
        exitTime,
      });

      alert(res.data.message || "Vehicle exited successfully.");
      setVehicleNumber('');
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicle. Vehicle not found or already exited.");
    }
  };

  return (
    <div className="exit-container">
      <div className="exit-card">
        <h2>Vehicle Exit</h2>
        <form onSubmit={handleSubmit}>
          <label>Vehicle Number:</label>
          <input
            type="text"
            placeholder="Enter vehicle number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
          <button type="submit">Submit Exit</button>
        </form>
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default Exit;
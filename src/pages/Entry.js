import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Entry.css';

const Entry = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [slot, setSlot] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVehicle = {
      vehicleNumber,
      owner: ownerName,
      slot,
      entryTime,
      exitTime: '',
      status: 'Parked'
    };

    try {
      await axios.post('http://localhost:5000/api/entry', newVehicle);
      alert('Entry recorded successfully in MongoDB!');
      setVehicleNumber('');
      setOwnerName('');
      setEntryTime('');
      setSlot('');
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to record entry.');
    }
  };

  return (
    <div className="entry-container">
      <div className="entry-form-box">
        <h2>Vehicle Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
          <input
            type="time"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
          />
          <button type="submit">Submit Entry</button>
        </form>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default Entry;
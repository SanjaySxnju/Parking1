import React, { useEffect, useState } from 'react';

const CheckSlot = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('parkingRecords')) || [];
    const allSlots = ['A1', 'A2', 'B1', 'B2', 'C1','C2','D1','D2'];
    const occupiedSlots = data
      .filter(entry => entry.status !== 'Exited')
      .map(entry => entry.slot);

    const availableSlots = allSlots.filter(slot => !occupiedSlots.includes(slot));
    setSlots(availableSlots);
  }, []);

  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f1f5f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  };

  const boxStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  };

  const listItemStyle = {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#e0f2fe',
    borderRadius: '5px',
    fontSize: '1.1rem',
    textAlign: 'center',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: 'center', color: '#0f172a' }}>Available Parking Slots</h2>
        {slots.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {slots.map((slot, index) => (
              <li key={index} style={listItemStyle}>
                Slot {slot}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
            All slots are currently occupied.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckSlot;
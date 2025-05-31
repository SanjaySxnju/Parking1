import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
  const interval = setInterval(() => {
    const storedRecords = JSON.parse(localStorage.getItem('parkingRecords')) || [];
    setRecords(storedRecords);
  }, 1000); // refresh every second

  return () => clearInterval(interval);
}, []);



  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle Number</th>
              <th>Owner</th>
              <th>Slot</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.vehicleNumber}</td>
                <td>{record.ownerName}</td>
                <td>{record.slot}</td>
                <td>{record.entryTime}</td>
                <td>{record.exitTime || '—'}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Dashboard;

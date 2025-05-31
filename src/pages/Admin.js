import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/records');
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch records from MongoDB');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete('http://localhost:5000/api/record/${idToDelete}');
      setData(data.filter((entry) => entry._id !== idToDelete));
    } catch (err) {
      console.error(err);
      alert('Failed to delete entry');
    }
  };

  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array</div>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Panel - Parking Records</h2>
      {data.length === 0 ? (
        <p className="no-data">No vehicle data available.</p>
      ) : (
        <table className="records-table">
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
            {data.map((entry, index) => (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.vehicleNumber}</td>
                <td>{entry.owner}</td>
                <td>{entry.slot}</td>
                <td>{entry.entryTime}</td>
                <td>{entry.exitTime || '—'}</td>
                <td className={entry.status === 'Parked' ? 'status-parked' : 'status-left'}>
                  {entry.status}
                </td>
               </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Admin;
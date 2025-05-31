import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Entry from './pages/Entry';
import Exit from './pages/Exit';
import Admin from './pages/Admin';
import CheckSlot from './pages/CheckSlot';
function App() {
  const [vehicles, setVehicles] = useState([]);

  const handleEntry = (vehicle) => {
  const newVehicle = { ...vehicle, status: 'Parked', exitTime: '' };

  // Save to state
  const updatedVehicles = [...vehicles, newVehicle];
  setVehicles(updatedVehicles);

  // Save to localStorage
  const stored = JSON.parse(localStorage.getItem('parkingRecords')) || [];
  stored.push(newVehicle);
  localStorage.setItem('parkingRecords', JSON.stringify(stored));
};


 const handleExit = (vehicleNumber, exitTime) => {
  // Update in-memory state
  const updated = vehicles.map((v) =>
    v.vehicleNumber === vehicleNumber ? { ...v, exitTime, status: 'Exited' } : v
  );
  setVehicles(updated);

  
  const stored = JSON.parse(localStorage.getItem('parkingRecords')) || [];
  const updatedStorage = stored.map((v) =>
    v.vehicleNumber === vehicleNumber ? { ...v, exitTime, status: 'Exited' } : v
  );
  localStorage.setItem('parkingRecords', JSON.stringify(updatedStorage));
};
return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard vehicles={vehicles} />} />
        <Route path="/Entry" element={<Entry onEntry={handleEntry} />} />
        <Route path="/Exit" element={<Exit onExit={handleExit} />} />
        <Route path="/Admin" element={<Admin vehicles={vehicles} />} />
         <Route path="/CheckSlot" element={<CheckSlot />} />
     </Routes>
    </Router>
  );
}

export default App;
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// ✅ Save new vehicle entry
router.post('/entry', async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.json({ message: 'Vehicle entry saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving vehicle' });
  }
});

// ✅ Get all vehicle records
router.get('/records', async (req, res) => {
  try {
    const records = await Vehicle.find();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

// ✅ Update exit info (exitTime + status)
router.put('/exit', async (req, res) => {
  const { vehicleNumber, exitTime } = req.body;

  try {
    const updated = await Vehicle.findOneAndUpdate(
      { vehicleNumber, status: 'Parked' },
      {
        exitTime: exitTime,
        status: 'Exited'
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Vehicle not found or already exited' });
    }

    res.json({ message: 'Exit updated successfully', record: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating exit' });
  }
});

// ✅ Delete a vehicle entry by ID
router.delete('/record/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

module.exports = router;
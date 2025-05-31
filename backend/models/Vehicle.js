const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  owner: String,
  slot: String,
  entryTime: String,
  exitTime: String,
  status: String
}, {
  collection: 'ParkingRecords'  // ✅ force collection name
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
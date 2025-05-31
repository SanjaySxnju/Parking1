const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Import your routes
const vehiclEntryRoute = require('./routes/vehiclEntry'); // for vehicle entries
const userRoute = require('./routes/userAuth'); // for saving user login credentials

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vehicleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// ✅ Use API routes
app.use('/api', vehiclEntryRoute);       // /api/entry, /api/records, etc.
app.use('/api/user', userRoute);         // /api/user/register

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// ✅ Start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
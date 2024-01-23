// src/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./api/routes/authRoutes');
const carRoutes = require('./api/routes/carRoutes');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Car Rental Backend!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

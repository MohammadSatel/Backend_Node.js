// src/api/routes/carRoutes.js
const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

// Create a new car
router.post('/', carController.createCar);

// Get all cars
router.get('/', carController.getAllCars);

// Get a single car by ID
router.get('/:id', carController.getCarById);

// Update a car by ID
router.put('/:id', carController.updateCarById);

// Delete a car by ID
router.delete('/:id', carController.deleteCarById);

// Search cars with filters
router.get('/search', carController.searchCars);

module.exports = router;

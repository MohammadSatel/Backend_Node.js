// src/api/routes/carRoutes.js

const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

router.post('/', carController.createCar);
router.get('/', carController.getAllCars);

// Add more routes as needed

module.exports = router;


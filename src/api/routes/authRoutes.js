const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Endpoint to handle user signup
router.post('/signup', authController.signup);

// Endpoint to handle user login
router.post('/login', authController.login);

module.exports = router;

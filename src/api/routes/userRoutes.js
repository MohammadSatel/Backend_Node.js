const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route for getting user profile; it's protected with authMiddleware
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;

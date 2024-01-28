const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get the user's profile information
router.get('/profile', authMiddleware, userController.getUserProfile);

// Route to update the user's profile information
router.put('/update-profile', authMiddleware, userController.updateUserProfile);

// Route to change the user's password
router.put('/change-password', authMiddleware, userController.changeUserPassword);

// Export the router
module.exports = router;

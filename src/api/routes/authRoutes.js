const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Endpoint to handle user signup
router.post('/signup', authController.signup);

// Endpoint to handle user login
router.post('/login', authController.login);

// Dummy endpoint for logout - the actual token invalidation will happen on the client-side
router.post('/logout', authMiddleware, (req, res) => {
    // The client should remove the JWT token from storage
    res.status(200).send({ message: 'Log out successful. Please clear your token.' });
});

// Endpoint to update the user's profile information
router.put('/update-profile', authMiddleware, userController.updateUserProfile);

// Endpoint to change the user's password
router.put('/change-password', authMiddleware, userController.changeUserPassword);

// Export the router
module.exports = router;

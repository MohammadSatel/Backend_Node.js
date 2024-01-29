const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


// Dummy logout route - for client-side handling
router.post('/logout', authMiddleware, (req, res) => {
    // Inform the client to clear the JWT token
    res.status(200).send({ message: 'Log out successful. Please clear your token.' });
});

// Route to update the user's profile information
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;

// Route to update the user's profile information
router.put('/update-profile', authMiddleware, userController.updateUserProfile);

// Route to change the user's password
router.put('/change-password', authMiddleware, userController.changeUserPassword);

// Export the router
module.exports = router;

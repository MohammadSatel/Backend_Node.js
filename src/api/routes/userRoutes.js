const express = require('express');
const multer = require('multer'); // For file uploads, if needed
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Existing user routes...
// ...

// Route for email verification
router.post('/verify-email', authMiddleware, userController.sendVerificationEmail);
router.post('/verify-email/:token', userController.verifyEmailToken);

// Route for initiating a password reset
router.post('/forgot-password', userController.forgotPassword);
// Route for resetting the password with a token
router.post('/reset-password/:token', userController.resetPassword);

// Route for updating the profile picture; using multer for file upload
const upload = multer({ dest: 'uploads/' }); // Configure multer as needed
router.post('/profile-picture', authMiddleware, upload.single('picture'), userController.updateProfilePicture);

// Route for deactivating the user account
router.delete('/deactivate-account', authMiddleware, userController.deactivateAccount);

// Add more routes as needed...

module.exports = router;

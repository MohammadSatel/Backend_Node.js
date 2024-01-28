const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// User signup route
router.post('/signup', authController.signup);

// User login route
router.post('/login', authController.login);

// Route for sending a verification email to the user
// Assumes you have a controller function for this
router.post('/send-verification-email', authController.sendVerificationEmail);

// Route for verifying user's email
// Assumes you have a controller function for this
router.post('/verify-email', authController.verifyEmail);

// Route for initiating a password reset process
// Assumes you have a controller function for this
router.post('/forgot-password', authController.forgotPassword);

// Route for resetting the password using a token received via email
// Assumes you have a controller function for this
router.post('/reset-password', authController.resetPassword);

// Route for refreshing an expired or about-to-expire token
// Assumes you have a controller function for this
router.post('/refresh-token', authController.refreshToken);

// Add more routes as needed for your authentication flow

module.exports = router;

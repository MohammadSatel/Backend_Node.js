const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Endpoint to handle user signup
router.post('/signup', authController.signup);

// Endpoint to handle user login
router.post('/login', authController.login);

// Endpoint to send a verification email to the user's email address
// Make sure to implement this controller function to handle the sending of verification emails
router.post('/send-verification-email', authController.sendVerificationEmail);

// Endpoint to verify the user's email with a token they received
// Make sure to implement this controller function to verify the token and update the user's email verification status
router.post('/verify-email', authController.verifyEmail);

// Endpoint for a user to initiate the password reset process
// Make sure to implement this controller function to handle password reset requests, typically involving sending a password reset email with a token
router.post('/forgot-password', authController.forgotPassword);

// Endpoint for a user to reset their password using a token they received via email
// Make sure to implement this controller function to allow users to reset their password using a reset token
router.post('/reset-password', authController.resetPassword);

// Endpoint to refresh an expired or about-to-expire JWT token
// Make sure to implement this controller function if you plan to use refresh tokens in your authentication strategy
router.post('/refresh-token', authController.refreshToken);


module.exports = router;

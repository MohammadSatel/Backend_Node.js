const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const crypto = require('crypto');
// Assuming you have a utility to send emails
const sendEmail = require('../utils/sendEmail'); // You need to implement this utility


// Handle user signup
exports.signup = async (req, res) => {
  try {
    const user = new User(req.body); // Create a new user instance with the request body
    await user.save(); // Save the new user to the database

    // Exclude the password before sending the response back
    const userObj = user.toObject();
    delete userObj.password; // Ensuring the password hash is not sent back

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Send the new user object and token back to the client
    res.status(201).send({ user: userObj, token });
  } catch (error) {
    // If there's an error during signup, send a 400 response
    res.status(400).send({ message: 'Signup failed', error: error.message });
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body
    // Find the user by email. The '+password' ensures that we select the password explicitly for comparison as it is not selected by default
    const user = await User.findOne({ email }).select('+password');

    // If the user is not found or the password does not match, return a 401 response
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Login failed! Check authentication credentials' });
    }

    // Exclude the password before sending the response back
    const userObj = user.toObject();
    delete userObj.password; // Ensuring the password hash is not sent back

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Send the user object and token back to the client
    res.send({ user: userObj, token });
  } catch (error) {
    // If there's an error during login, send a 400 response
    res.status(400).send({ message: 'Login failed', error: error.message });
  }
};

// Send a verification email
exports.sendVerificationEmail = async (req, res) => {
  // This would require your User model to have an email verification token field
  const user = req.user; // You need to make sure the user is set, perhaps from a previous middleware
  const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // Send the verification token via email
  await sendEmail(user.email, 'Verify Your Email', `Your verification token is: ${verificationToken}`);
  res.status(200).send({ message: 'Verification email sent' });
};

// Verify user's email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body; // Get the token from the request body
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.userId); // Find the user by decoded token id
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.isEmailVerified = true; // Update the user's email verification status
    await user.save();
    res.status(200).send({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Email verification failed', error: error.message });
  }
};

// Initiate password reset process
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'No user found with that email.' });
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `https://yourfrontenddomain.com/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Please go to this URL to reset your password: ${resetUrl}`);
    res.status(200).send({ message: 'Password reset email sent.' });
  } catch (error) {
    res.status(500).send({ message: 'Error during forgot password', error });
  }
};

// Reset password using token
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).send({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({ message: 'Your password has been updated.' });
  } catch (error) {
    res.status(500).send({ message: 'Error resetting password', error });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }
    const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).send({ token: newToken });
  } catch (error) {
    res.status(500).send({ message: 'Error refreshing token', error });
  }
};

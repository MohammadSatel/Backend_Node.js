const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const bcrypt = require('bcryptjs');

// Get user profile along with booking history
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is populated by the auth middleware
    const user = await User.findById(userId, '-password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const bookings = await Booking.find({ user: userId }).populate('car', 'make model year');
    const userData = {
      // Preparing user data for response
    };
    res.status(200).send({ user: userData, bookings });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user profile', error });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    // Optional: Validate updateData before proceeding
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error updating user profile', error });
  }
};

// Change user password
exports.changeUserPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).send({ message: 'Current password is incorrect' });
    }
    user.password = await bcrypt.hash(newPassword, 8);
    await user.save();
    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error changing password', error });
  }
};

// Dummy function for sending a verification email
exports.sendVerificationEmail = async (req, res) => {
  // Implementation depends on your email service
  res.status(200).send({ message: 'Verification email sent successfully' });
};

// Dummy function for verifying the email token
exports.verifyEmailToken = async (req, res) => {
  // Implementation depends on your token verification logic
  res.status(200).send({ message: 'Email verified successfully' });
};

// Dummy function for handling forgot password
exports.forgotPassword = async (req, res) => {
  // Implementation depends on your password reset logic
  res.status(200).send({ message: 'Password reset email sent successfully' });
};

// Dummy function for resetting the password using a token
exports.resetPassword = async (req, res) => {
  // Implementation depends on your password reset token logic
  res.status(200).send({ message: 'Password reset successfully' });
};

// Add more functions as needed for other user operations

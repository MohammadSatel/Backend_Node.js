// userController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
// Assume Booking model is also required if you are using it for the getUserProfile

// Get user profile and booking history
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    // If you're also fetching bookings, add that logic here
    // const bookings = await Booking.find({ user: req.user._id }).populate('car');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user profile', error });
  }
};

// Update user profile information
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: 'Error updating user profile', error });
  }
};

// Change user password
exports.changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // Verify current password
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).send({ message: 'Current password is incorrect' });
    }

    // Hash new password and save
    user.password = await bcrypt.hash(newPassword, 8);
    await user.save();

    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error changing password', error });
  }
};

// Add other handlers as necessary...

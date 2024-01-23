const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

exports.getUserProfile = async (req, res) => {
  try {
    // The user's ID is retrieved from the JWT token
    const userId = req.user._id; 

    // Fetch user information from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Fetch booking history for the user
    const bookings = await Booking.find({ user: userId });

    // Send user information and bookings back to the client
    res.send({ user, bookings });
  } catch (error) {
    res.status(500).send(error);
  }
};

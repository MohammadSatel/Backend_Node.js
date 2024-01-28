const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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

// Endpoint to send a verification email to the user's email address

// Endpoint to verify the user's email with a token they received

// Endpoint for a user to initiate the password reset process

// Endpoint for a user to reset their password using a token they received via email

// Endpoint to refresh an expired or about-to-expire JWT token


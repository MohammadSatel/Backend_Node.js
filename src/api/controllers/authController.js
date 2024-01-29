const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Handle user signup
exports.signup = async (req, res) => {
    try {
        // Add input validation here
        
        const user = new User(req.body);
        
        // Hash the password before saving
        user.password = await bcrypt.hash(user.password, 8);

        await user.save();

        const token = generateToken(user._id);
        // Exclude the password before sending the response back
        const { password, ...userObj } = user.toObject();

        res.status(201).send({ user: userObj, token });
    } catch (error) {
        // Provide more specific error messages based on the error type
        res.status(400).send({ message: 'Signup failed', error: error.message });
    }
};

// Handle user login
exports.login = async (req, res) => {
    try {
        // Add input validation here

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        const token = generateToken(user._id);
        // Exclude the password before sending the response back
        const { password, ...userObj } = user.toObject();

        res.send({ user: userObj, token });
    } catch (error) {
        // Provide more specific error messages based on the error type
        res.status(400).send({ message: 'Login failed', error: error.message });
    }
};

// Add logout functionality if needed. JWT typically requires frontend to delete the token.

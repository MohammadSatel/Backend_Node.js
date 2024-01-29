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
        const user = new User(req.body);

        // Hash the password before saving
        user.password = await bcrypt.hash(user.password, 8);
        await user.save();

        const token = generateToken(user._id);
        const { password, ...userObj } = user.toObject();

        res.status(201).send({ user: userObj, token });
    } catch (error) {
        res.status(400).send({ message: 'Signup failed', error: error.message });
    }
};

// Handle user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Login failed! Check authentication credentials' });
        }

        const token = generateToken(user._id);
        const { password, ...userObj } = user.toObject();

        res.send({ user: userObj, token });
    } catch (error) {
        res.status(400).send({ message: 'Login failed', error: error.message });
    }
};

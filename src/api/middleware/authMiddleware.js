const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'No token provided or token is malformed' });
    }
    const token = authHeader.replace('Bearer ', '');

    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database using the decoded userId
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error('User not found with provided token');
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token; // Optional: In case you need the token in subsequent handlers

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;

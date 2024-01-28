const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware function to authenticate user based on JWT token
const auth = async (req, res, next) => {
  try {
    // Get the token from the Authorization header and remove the 'Bearer ' prefix
    const token = req.header('Authorization').replace('Bearer ', '');
    // Decode the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database using the ID from the token
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      // If no user is found, throw an error to be caught by the catch block
      throw new Error('User not found');
    }

    // Attach the user object to the request for use in subsequent handlers
    req.user = user;
    // Call next to proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If anything goes wrong, return a 401 Unauthorized response
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;

const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Middleware to verify token
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  console.log('Received Token:', token); 
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' }); 
  }

  try {
    // Ensure JWT_SECRET is loaded from .env correctly
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in the environment variables!');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Verify the token using JWT_SECRET and decode the user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); 

    // Fetch the user from the database using the decoded user ID
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' }); 
    }

    next(); // If everything is fine, pass control to the next middleware or route handler
  } catch (err) {
    console.error('Invalid or expired token:', err);
    // Specific error messages for debugging
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Malformed or invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    res.status(401).json({ message: 'Invalid or expired token' }); 
  }
};

module.exports = authMiddleware;

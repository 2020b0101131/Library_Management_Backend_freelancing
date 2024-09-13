const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

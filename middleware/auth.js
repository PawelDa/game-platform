const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Get the token from header
  const token = req.header('x-auth-token');

  // Check if there is no token
  if(!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT);

    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};

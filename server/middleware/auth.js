const jwt = require('jsonwebtoken');
const config = require('../config');

const validateToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'Unauthorized request!' });

  try {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: 'Unauthorized request!' });
        console.error(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Internal auth error - error in token validation middleware');
    res.status(500).json({ msg: 'Internal auth error' });
  }
};

module.exports = validateToken;

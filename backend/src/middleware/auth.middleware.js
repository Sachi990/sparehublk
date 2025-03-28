const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided.' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token.' });
    req.user = decoded;
    next();
  });
};

exports.verifyTokenOptional = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    req.user = null;
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    req.user = err ? null : decoded;
    next();
  });
};

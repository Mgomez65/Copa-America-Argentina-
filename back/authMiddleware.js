const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401); 
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Error en la verificación del token:', err);
      return res.sendStatus(403); 
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
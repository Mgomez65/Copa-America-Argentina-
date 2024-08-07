const express = require('express');
const router = express.Router();
const controller = require("../controllers/authControllers") 
const authenticateToken = require("../authMiddleware"); 

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/users', authenticateToken, controller.getUsers); 
router.get('/users/:id', authenticateToken, controller.getUserById); 
router.delete('/users/:id', authenticateToken, controller.deleteUser); 
router.post('/users/:id', authenticateToken, controller.updateUser); 

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
});

module.exports = router;

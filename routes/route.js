const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes principales
router.get('/', (req, res) => {
  res.redirect('/userForm.html');
});

// Routes utilisateurs
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router; 
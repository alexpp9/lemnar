const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// Register user
router.post('/registerUser', users.registeredUser);

// Login user
router.post('/loginUser', users.loginUser);
// Logout user;
router.post('/logoutUser', users.logoutUser);

// Check auth
router.get('/check-auth', users.checkAuth);
// Exports router
module.exports = router;

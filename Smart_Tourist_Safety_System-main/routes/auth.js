// placeholder for auth.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, getAllUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.get('/users', getAllUsers); // New route to view all users
router.get('/test', (req, res) => res.json({ message: 'Backend connected!', timestamp: new Date() })); // Test endpoint

module.exports = router;

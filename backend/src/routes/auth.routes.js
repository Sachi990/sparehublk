const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/me', verifyToken, AuthController.getProfile);
router.put('/me', verifyToken, AuthController.updateProfile); // This line must exist

module.exports = router;

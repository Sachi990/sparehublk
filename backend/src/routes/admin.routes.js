const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { verifyAdmin } = require('../middleware/verifyAdmin.middleware');

// Admin login endpoint
router.post('/login', AdminController.login);

// Protected admin dashboard
router.get('/dashboard', verifyToken, verifyAdmin, AdminController.dashboard);

module.exports = router;

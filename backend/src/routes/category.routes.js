// routes/category.routes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { verifyAdmin } = require('../middleware/verifyAdmin.middleware');

// Public endpoint to fetch categories
router.get('/', CategoryController.getCategories);

// Protected endpoints (only for admins)
router.post('/', verifyToken, verifyAdmin, CategoryController.createCategory);
// Add more endpoints if needed: PUT, DELETE

module.exports = router;

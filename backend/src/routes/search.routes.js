// routes/search.routes.js
const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search.controller');

// Advanced search endpoint
router.get('/advanced', SearchController.getAdvancedSuggestions);

module.exports = router;

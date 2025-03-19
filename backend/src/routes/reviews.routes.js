const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/reviews.controller');
const { verifyTokenOptional } = require('../middleware/auth.middleware');

router.get('/:productId', ReviewsController.getReviewsByProduct);
router.post('/', verifyTokenOptional, ReviewsController.addReview);

module.exports = router;

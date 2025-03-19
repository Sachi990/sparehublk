const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlist.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, WishlistController.getWishlist);
router.post('/', verifyToken, WishlistController.addToWishlist);
router.delete('/:id', verifyToken, WishlistController.removeFromWishlist);

module.exports = router;

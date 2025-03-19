const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, CartController.getCart);
router.post('/', verifyToken, CartController.addToCart);
router.delete('/:id', verifyToken, CartController.removeFromCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, OrderController.createOrder);
router.post('/guest', OrderController.createGuestOrder);
router.get('/', verifyToken, OrderController.getOrders);
router.patch('/:id', verifyToken, OrderController.updateOrderStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/process', verifyToken, PaymentController.processPayment);

module.exports = router;

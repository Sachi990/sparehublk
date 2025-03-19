const express = require('express');
const router = express.Router();
const ReportsController = require('../controllers/reports.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { verifyAdmin } = require('../middleware/verifyAdmin.middleware');

router.get('/sales', verifyToken, verifyAdmin, ReportsController.monthlySalesReport);
router.get('/profit', verifyToken, verifyAdmin, ReportsController.monthlyProfitReport);
router.get('/inventory', verifyToken, verifyAdmin, ReportsController.inventoryReport);

module.exports = router;

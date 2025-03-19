const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('../models/product.model');

exports.monthlySalesReport = async (req, res) => {
  try {
    const salesReport = await sequelize.query(
      `SELECT DATE_TRUNC('month', "createdAt") as month,
              COUNT(*) as order_count,
              SUM(total) as total_revenue
       FROM "Orders"
       GROUP BY month
       ORDER BY month;`,
      { type: QueryTypes.SELECT }
    );
    res.json(salesReport);
  } catch (error) {
    console.error("Sales report error:", error);
    res.status(500).json({ error: 'Failed to generate sales report' });
  }
};

exports.monthlyProfitReport = async (req, res) => {
  try {
    const profitReport = await sequelize.query(
      `SELECT DATE_TRUNC('month', "createdAt") as month,
              SUM(total) as total_revenue,
              SUM(total) * 0.4 as total_profit
       FROM "Orders"
       GROUP BY month
       ORDER BY month;`,
      { type: QueryTypes.SELECT }
    );
    res.json(profitReport);
  } catch (error) {
    console.error("Profit report error:", error);
    res.status(500).json({ error: 'Failed to generate profit report' });
  }
};

exports.inventoryReport = async (req, res) => {
  try {
    const inventory = await Product.findAll();
    const lowStock = inventory.filter(item => item.stock < 10);
    res.json({ inventory, lowStock });
  } catch (error) {
    console.error("Inventory report error:", error);
    res.status(500).json({ error: 'Failed to generate inventory report' });
  }
};

// product.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uniqueProductId: { type: DataTypes.STRING, unique: true },
  name: DataTypes.STRING,
  model: DataTypes.STRING,
  brand: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,         // Sale Price
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  stock: DataTypes.INTEGER,
  buyingPrice: DataTypes.FLOAT,   // Cost price
  category: DataTypes.STRING,
  subcategory: DataTypes.STRING,
  productType: DataTypes.STRING,
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  images: { type: DataTypes.JSON, defaultValue: [] }
});

// Auto-generate uniqueProductId (SKU) using UUID if not provided
Product.beforeCreate((product) => {
  if (!product.uniqueProductId) {
    product.uniqueProductId = 'SKU-' + uuidv4().toUpperCase();
  }
});

module.exports = Product;

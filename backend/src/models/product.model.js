const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  model: DataTypes.STRING,
  brand: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  stock: DataTypes.INTEGER,
  images: { type: DataTypes.JSON, defaultValue: [] }
});

module.exports = Product;

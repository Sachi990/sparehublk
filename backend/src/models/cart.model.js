const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

module.exports = Cart;

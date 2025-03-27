// models/category.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  // Optionally, add a field for subcategories as a JSON array:
  subcategories: { type: DataTypes.JSON, defaultValue: [] }
}, {
  tableName: 'Categories',
  timestamps: true,
});

module.exports = Category;

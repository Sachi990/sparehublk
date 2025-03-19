// backend/src/models/admin.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
  // Sequelize automatically adds createdAt and updatedAt when timestamps are enabled
});

module.exports = Admin;

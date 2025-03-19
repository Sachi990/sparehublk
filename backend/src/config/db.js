// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;

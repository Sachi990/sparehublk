const sequelize = require('./db');
const models = require('../models');

sequelize.sync({ alter: true })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Sync error:', err));

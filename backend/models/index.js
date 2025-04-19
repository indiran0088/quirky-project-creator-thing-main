const { Sequelize } = require('sequelize');
const User = require('./User');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or your database type
    logging: false
  }
);

// Initialize models
const db = {
  User: User(sequelize, Sequelize.DataTypes),
  sequelize
};

// Sync models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));

module.exports = db;
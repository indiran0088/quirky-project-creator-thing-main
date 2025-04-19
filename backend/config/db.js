// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // config/database.js
// const { Sequelize } = require('sequelize');
// const Invitation = require('../models/StaffInvitation'); // Adjust the path as necessary

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   logging: false // Disable SQL logging in production
// });

// const models = {
//   Invitation: Invitation(sequelize, Sequelize.DataTypes)
// };

// console.log('Database config:', {
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     // Add password if you want to verify it's being read (remove after debugging)
//     password: process.env.DB_PASSWORD ? '*****' : 'undefined' 
//   });

// // Test the connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// // Sync models with database
// async function syncModels() {
//   try {
//     await sequelize.sync({ alter: true }); // Use { force: true } to drop tables and recreate
//     console.log('Database models synchronized');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// }

// module.exports = {
//   sequelize,
//   models,
//   testConnection,
//   syncModels
// };

// module.exports = pool.promise();


const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

// Import models
const User = require('../models/User');
const Invitation = require('../models/StaffInvitation');

// Initialize models
const models = {
  User: User(sequelize, DataTypes),
  Invitation: Invitation(sequelize, DataTypes)
};

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Sync models
async function syncModels() {
  try {
    const options = process.env.NODE_ENV === 'development' 
      ? { force: true } 
      : { alter: true };
    
    await sequelize.sync(options);
    console.log('✅ Database tables synchronized');
    return true;
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    return false;
  }
}

module.exports = {
  sequelize,
  models,
  testConnection,
  syncModels
};
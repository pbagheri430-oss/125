const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.NODE_ENV === 'test'
  ? new Sequelize('sqlite::memory:', { logging: false })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
    });

module.exports = sequelize;

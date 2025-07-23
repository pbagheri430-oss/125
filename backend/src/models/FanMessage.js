const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FanMessage = sequelize.define('FanMessage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  message: DataTypes.TEXT,
}, { timestamps: true });

module.exports = FanMessage;

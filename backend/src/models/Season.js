const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Season = sequelize.define('Season', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  year_start: { type: DataTypes.INTEGER, allowNull: false },
  year_end: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false });

module.exports = Season;

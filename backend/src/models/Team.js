const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  logo_url: DataTypes.STRING,
  stadium: DataTypes.STRING,
  founded: DataTypes.INTEGER,
}, { timestamps: false });

module.exports = Team;

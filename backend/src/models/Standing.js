const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Season = require('./Season');
const Team = require('./Team');

const Standing = sequelize.define('Standing', {
  played: DataTypes.INTEGER,
  won: DataTypes.INTEGER,
  drawn: DataTypes.INTEGER,
  lost: DataTypes.INTEGER,
  points: DataTypes.INTEGER,
}, { timestamps: false });

Season.hasMany(Standing, { foreignKey: 'season_id' });
Standing.belongsTo(Season, { foreignKey: 'season_id' });
Team.hasMany(Standing, { foreignKey: 'team_id' });
Standing.belongsTo(Team, { foreignKey: 'team_id' });

module.exports = Standing;

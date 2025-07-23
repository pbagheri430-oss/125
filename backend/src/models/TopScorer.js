const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Player = require('./Player');
const Season = require('./Season');

const TopScorer = sequelize.define('TopScorer', {
  goals: DataTypes.INTEGER,
  assists: DataTypes.INTEGER,
}, { timestamps: false });

Season.hasMany(TopScorer, { foreignKey: 'season_id' });
TopScorer.belongsTo(Season, { foreignKey: 'season_id' });
Player.hasMany(TopScorer, { foreignKey: 'player_id' });
TopScorer.belongsTo(Player, { foreignKey: 'player_id' });

module.exports = TopScorer;

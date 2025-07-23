const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Team = require('./Team');

const Player = sequelize.define('Player', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  position: DataTypes.STRING,
  nationality: DataTypes.STRING,
  yellow_cards: { type: DataTypes.INTEGER, defaultValue: 0 },
  red_cards: { type: DataTypes.INTEGER, defaultValue: 0 },
  xg: { type: DataTypes.FLOAT, defaultValue: 0 },
}, { timestamps: false });

Team.hasMany(Player, { foreignKey: 'team_id' });
Player.belongsTo(Team, { foreignKey: 'team_id' });

module.exports = Player;

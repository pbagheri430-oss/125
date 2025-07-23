const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Team = require('./Team');
const Season = require('./Season');

const Match = sequelize.define('Match', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: DataTypes.DATE,
  home_score: DataTypes.INTEGER,
  away_score: DataTypes.INTEGER,
}, { timestamps: false });

Team.hasMany(Match, { as: 'HomeMatches', foreignKey: 'home_team_id' });
Team.hasMany(Match, { as: 'AwayMatches', foreignKey: 'away_team_id' });
Match.belongsTo(Team, { as: 'HomeTeam', foreignKey: 'home_team_id' });
Match.belongsTo(Team, { as: 'AwayTeam', foreignKey: 'away_team_id' });
Season.hasMany(Match, { foreignKey: 'season_id' });
Match.belongsTo(Season, { foreignKey: 'season_id' });

module.exports = Match;

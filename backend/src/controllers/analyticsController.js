const { Op } = require('sequelize');
const Match = require('../models/Match');
const TopScorer = require('../models/TopScorer');
const Player = require('../models/Player');
const Season = require('../models/Season');
const Team = require('../models/Team');

async function topScorersTrends(req, res) {
  const data = await TopScorer.findAll({
    include: [Player, Season],
    order: [['season_id', 'ASC'], ['goals', 'DESC']],
  });
  res.json(data);
}

async function teamForm(req, res) {
  const teamId = req.params.teamId;
  const matches = await Match.findAll({
    where: {
      [Op.or]: [{ home_team_id: teamId }, { away_team_id: teamId }],
    },
    order: [['date', 'DESC']],
    limit: 5,
  });
  const form = matches.map(m => {
    const isHome = m.home_team_id === parseInt(teamId, 10);
    const home = m.home_score;
    const away = m.away_score;
    if (home == null || away == null) return 'P';
    if ((isHome && home > away) || (!isHome && away > home)) return 'W';
    if (home === away) return 'D';
    return 'L';
  });
  res.json(form);
}

module.exports = { topScorersTrends, teamForm };

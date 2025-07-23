const { Op } = require('sequelize');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Season = require('../models/Season');

async function search(req, res) {
  const q = req.query.q || '';
  if (!q) return res.json({ teams: [], players: [], matches: [] });

  const teams = await Team.findAll({ where: { name: { [Op.iLike]: `%${q}%` } } });
  const players = await Player.findAll({ where: { name: { [Op.iLike]: `%${q}%` } }, include: Team });
  const matches = await Match.findAll({
    include: [
      { model: Team, as: 'HomeTeam' },
      { model: Team, as: 'AwayTeam' },
      Season,
    ],
    where: {
      [Op.or]: [
        { '$HomeTeam.name$': { [Op.iLike]: `%${q}%` } },
        { '$AwayTeam.name$': { [Op.iLike]: `%${q}%` } },
      ],
    },
  });

  res.json({ teams, players, matches });
}

module.exports = { search };

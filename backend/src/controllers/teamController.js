const Team = require('../models/Team');
const Player = require('../models/Player');
const { getCache, setCache } = require('../middleware/cache');

async function listTeams(req, res) {
  const cacheKey = 'teams_all';
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  const teams = await Team.findAll();
  setCache(cacheKey, teams);
  res.json(teams);
}

async function teamDetails(req, res) {
  const cacheKey = `team_${req.params.id}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  const team = await Team.findByPk(req.params.id, { include: Player });
  if (!team) return res.status(404).json({ error: 'Team not found' });
  setCache(cacheKey, team);
  res.json(team);
}

module.exports = { listTeams, teamDetails };

const TopScorer = require('../models/TopScorer');
const Player = require('../models/Player');
const Team = require('../models/Team');
const { getCache, setCache } = require('../middleware/cache');

async function scorersBySeason(req, res) {
  const season = req.query.season;
  const cacheKey = `scorers_${season || 'all'}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  const scorers = await TopScorer.findAll({
    include: [{ model: Player, include: [Team] }],
    where: season ? { season_id: season } : undefined,
    order: [['goals', 'DESC']],
  });
  setCache(cacheKey, scorers);
  res.json(scorers);
}

module.exports = { scorersBySeason };

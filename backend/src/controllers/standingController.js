const Standing = require('../models/Standing');
const Team = require('../models/Team');
const { getCache, setCache } = require('../middleware/cache');

async function standingsBySeason(req, res) {
  const season = req.query.season;
  const cacheKey = `standings_${season || 'all'}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  const standings = await Standing.findAll({
    include: Team,
    where: season ? { season_id: season } : undefined,
    order: [['points', 'DESC']],
  });
  setCache(cacheKey, standings);
  res.json(standings);
}

module.exports = { standingsBySeason };

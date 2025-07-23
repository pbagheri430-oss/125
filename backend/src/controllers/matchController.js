const Match = require('../models/Match');
const Team = require('../models/Team');
const Season = require('../models/Season');
const { getCache, setCache } = require('../middleware/cache');

async function matchesBySeason(req, res) {
  const season = req.query.season;
  const cacheKey = `matches_${season || 'all'}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  const matches = await Match.findAll({
    include: [
      { model: Team, as: 'HomeTeam' },
      { model: Team, as: 'AwayTeam' },
      Season,
    ],
    where: season ? { season_id: season } : undefined,
  });
  setCache(cacheKey, matches);
  res.json(matches);
}

module.exports = { matchesBySeason };

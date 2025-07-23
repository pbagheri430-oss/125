const Player = require('../models/Player');
const Team = require('../models/Team');
const TopScorer = require('../models/TopScorer');

async function playerDetails(req, res) {
  const player = await Player.findByPk(req.params.id, {
    include: [Team, TopScorer]
  });
  if (!player) return res.status(404).json({ error: 'Not found' });
  res.json(player);
}

module.exports = { playerDetails };

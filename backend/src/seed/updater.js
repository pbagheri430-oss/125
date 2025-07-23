const axios = require('axios');
const Match = require('../models/Match');
const { io } = require('../index');

async function updateFixtures() {
  const token = process.env.FOOTBALL_DATA_API_KEY;
  const headers = token ? { 'X-Auth-Token': token } : {};
  try {
    const today = new Date().toISOString().split('T')[0];
    const resp = await axios.get(`https://api.football-data.org/v4/competitions/PL/matches?dateFrom=${today}&dateTo=${today}`, { headers });
    for (const m of resp.data.matches) {
      const record = await Match.upsert({
        id: m.id,
        season_id: m.season ? m.season.id : null,
        date: m.utcDate,
        home_team_id: m.homeTeam.id,
        away_team_id: m.awayTeam.id,
        home_score: m.score.fullTime.home ?? null,
        away_score: m.score.fullTime.away ?? null,
      });
      io.emit('match:update', record[0]);
    }
    console.log('Fixtures updated');
  } catch (err) {
    console.error('Fixture update failed', err.message);
  }
}

module.exports = { updateFixtures };

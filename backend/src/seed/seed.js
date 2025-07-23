const axios = require('axios');
const sequelize = require('../config/db');
const Season = require('../models/Season');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Standing = require('../models/Standing');
const TopScorer = require('../models/TopScorer');

async function seed() {
  await sequelize.sync({ force: true });

  const token = process.env.FOOTBALL_DATA_API_KEY;
  const headers = token ? { 'X-Auth-Token': token } : {};

  try {
    // Fetch current season teams
    const teamResp = await axios.get('https://api.football-data.org/v4/competitions/PL/teams', { headers });
    const teams = await Team.bulkCreate(teamResp.data.teams.map(t => ({
      id: t.id,
      name: t.name,
      logo_url: t.crest,
      stadium: t.venue,
      founded: t.founded,
    })));

    // Create season record
    const seasonYear = teamResp.data.season.startDate.split('-')[0];
    const season = await Season.create({ year_start: parseInt(seasonYear), year_end: parseInt(seasonYear) + 1 });

    // Fetch matches for the season
    const matchResp = await axios.get(`https://api.football-data.org/v4/competitions/PL/matches?season=${seasonYear}`, { headers });
    const standingsMap = {};
    for (const m of matchResp.data.matches) {
      await Match.create({
        id: m.id,
        season_id: season.id,
        date: m.utcDate,
        home_team_id: m.homeTeam.id,
        away_team_id: m.awayTeam.id,
        home_score: m.score.fullTime.home ?? null,
        away_score: m.score.fullTime.away ?? null,
      });

      // accumulate standings
      const homeId = m.homeTeam.id;
      const awayId = m.awayTeam.id;
      standingsMap[homeId] = standingsMap[homeId] || { played: 0, won: 0, drawn: 0, lost: 0, points: 0 };
      standingsMap[awayId] = standingsMap[awayId] || { played: 0, won: 0, drawn: 0, lost: 0, points: 0 };
      standingsMap[homeId].played += 1;
      standingsMap[awayId].played += 1;

      if (m.score.winner === 'HOME_TEAM') {
        standingsMap[homeId].won += 1;
        standingsMap[homeId].points += 3;
        standingsMap[awayId].lost += 1;
      } else if (m.score.winner === 'AWAY_TEAM') {
        standingsMap[awayId].won += 1;
        standingsMap[awayId].points += 3;
        standingsMap[homeId].lost += 1;
      } else {
        standingsMap[homeId].drawn += 1;
        standingsMap[awayId].drawn += 1;
        standingsMap[homeId].points += 1;
        standingsMap[awayId].points += 1;
      }
    }

    for (const [teamId, data] of Object.entries(standingsMap)) {
      await Standing.create({ season_id: season.id, team_id: teamId, ...data });
    }

    // Top scorers
    const scorersResp = await axios.get(`https://api.football-data.org/v4/competitions/PL/scorers?season=${seasonYear}`, { headers });
    for (const s of scorersResp.data.scorers) {
      const player = await Player.findOrCreate({
        where: { id: s.player.id },
        defaults: { name: s.player.name, position: s.player.position, nationality: s.player.nationality, team_id: s.team.id }
      }).then(([p]) => p);
      await TopScorer.create({ player_id: player.id, season_id: season.id, goals: s.goals, assists: s.assists });
    }
  } catch (err) {
    console.error('API fetch failed, inserting demo data', err.message);
    const season = await Season.create({ year_start: 2023, year_end: 2024 });
    const team1 = await Team.create({ name: 'Example FC', stadium: 'Example Stadium' });
    const team2 = await Team.create({ name: 'Sample United', stadium: 'Sample Ground' });
    await Player.bulkCreate([
      { name: 'John Doe', position: 'Forward', nationality: 'ENG', team_id: team1.id },
      { name: 'Max Mustermann', position: 'Midfielder', nationality: 'GER', team_id: team2.id },
    ]);
    await Match.create({
      season_id: season.id,
      date: new Date(),
      home_team_id: team1.id,
      away_team_id: team2.id,
      home_score: 2,
      away_score: 1,
    });
    await Standing.bulkCreate([
      { season_id: season.id, team_id: team1.id, played: 1, won: 1, drawn: 0, lost: 0, points: 3 },
      { season_id: season.id, team_id: team2.id, played: 1, won: 0, drawn: 0, lost: 1, points: 0 },
    ]);
    const player = await Player.findOne();
    await TopScorer.create({ player_id: player.id, season_id: season.id, goals: 2, assists: 0 });
  }

  console.log('Seeded');
  process.exit();
}

seed();

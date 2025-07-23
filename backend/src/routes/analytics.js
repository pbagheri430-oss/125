const express = require('express');
const router = express.Router();
const { topScorersTrends, teamForm } = require('../controllers/analyticsController');

router.get('/top-scorers-trends', topScorersTrends);
router.get('/team-form/:teamId', teamForm);

module.exports = router;

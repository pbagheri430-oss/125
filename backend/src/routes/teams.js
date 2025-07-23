const express = require('express');
const router = express.Router();
const { listTeams, teamDetails } = require('../controllers/teamController');

router.get('/', listTeams);
router.get('/:id', teamDetails);

module.exports = router;

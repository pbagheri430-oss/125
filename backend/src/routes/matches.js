const express = require('express');
const router = express.Router();
const { matchesBySeason } = require('../controllers/matchController');

router.get('/', matchesBySeason);

module.exports = router;

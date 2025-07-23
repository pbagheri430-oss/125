const express = require('express');
const router = express.Router();
const { standingsBySeason } = require('../controllers/standingController');

router.get('/', standingsBySeason);

module.exports = router;

const express = require('express');
const router = express.Router();
const { scorersBySeason } = require('../controllers/scorerController');

router.get('/', scorersBySeason);

module.exports = router;

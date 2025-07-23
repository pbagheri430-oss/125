const express = require('express');
const router = express.Router();
const { playerDetails } = require('../controllers/playerController');

router.get('/:id', playerDetails);

module.exports = router;

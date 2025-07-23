const express = require('express');
const router = express.Router();

const teamRoutes = require('./teams');
const matchRoutes = require('./matches');
const standingRoutes = require('./standings');
const scorerRoutes = require('./scorers');
const contactRoutes = require('./contact');
const searchRoutes = require('./search');
const analyticsRoutes = require('./analytics');
const playerRoutes = require('./players');

router.use('/teams', teamRoutes);
router.use('/matches', matchRoutes);
router.use('/standings', standingRoutes);
router.use('/scorers', scorerRoutes);
router.use('/contact', contactRoutes);
router.use('/search', searchRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/players', playerRoutes);

module.exports = router;

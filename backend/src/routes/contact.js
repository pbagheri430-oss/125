const express = require('express');
const router = express.Router();
const { postMessage } = require('../controllers/contactController');
const { body } = require('express-validator');

router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('message').notEmpty()
], postMessage);

module.exports = router;

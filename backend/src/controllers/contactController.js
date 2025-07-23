const FanMessage = require('../models/FanMessage');

const { validationResult } = require('express-validator');

async function postMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, message } = req.body;
  await FanMessage.create({ name, email, message });
  res.json({ success: true });
}

module.exports = { postMessage };

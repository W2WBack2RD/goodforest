const express = require('express');
const bcrypt = require('bcryptjs');
const { requireAuth } = require('./middleware');
const { User } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  res.send({ message: 'Hi' });
});

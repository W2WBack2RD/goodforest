// קובץ הגישה לכל הראוטים

const express = require('express');
const path = require('path');
const auth = require('./auth');

const user = require('./user');
const forest = require('./forest');

const router = express.Router();

router.use('/api/user', user);
router.use('/api/forest', forest);

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN', 'Node', 'Express', 'Webpack', 'React', 'Redux', 'Mongoose',
    'Bulma', 'Fontawesome', 'Ramda', 'ESLint', 'Jest',
  ]);
});

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;

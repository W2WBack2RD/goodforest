// קובץ הגישה לכל הראוטים

const express = require('express');
const path = require('path');
const auth = require('./auth');
<<<<<<< HEAD
<<<<<<< HEAD

const user = require('./user');
=======
=======
>>>>>>> 0e8ec4fc2da990a8ce159b38f1cc75b388dabc45
const user = require('./user');
const users = require('./users');
const todos = require('./todos');
const example = require('./example');
const report = require('./report');
<<<<<<< HEAD
>>>>>>> c0933cac5ceb5bd098f68b5b15d1b9b85796e446
=======
>>>>>>> 0e8ec4fc2da990a8ce159b38f1cc75b388dabc45
const forest = require('./forest');

const router = express.Router();

router.use('/api/user', user);
router.use('/api/forest', forest);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 0e8ec4fc2da990a8ce159b38f1cc75b388dabc45
router.use('/api/users', users);
router.use('/api/example', example);
router.use('/api/todos', todos);
router.use('/api/report', report);

<<<<<<< HEAD
>>>>>>> c0933cac5ceb5bd098f68b5b15d1b9b85796e446
=======
>>>>>>> 0e8ec4fc2da990a8ce159b38f1cc75b388dabc45

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

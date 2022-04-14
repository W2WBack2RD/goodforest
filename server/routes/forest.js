const express = require('express');
const { Forest, User } = require('../database/schemas');

const router = express.Router();

router.get('/', (req, res) => {
    Forest.find({}, (err, forests) => {
        if (err) {
            res.status(400).send({ message: 'Get forests failed', err });
        } else {
            res.send({ message: 'Forests retrieved successfully', forests });
        }
    });
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    Forest.findById(id, async (err, forest) => {
        var users = await User.find({ forest: id })
        var usersCount = users?.length || 0;
        if (err) {
            res.status(400).send({ message: 'Get forest failed', err });
        } else {
            res.send({ message: 'Forest retrieved successfully', forest, usersCount });
        }
    });

});


module.exports = router;

const express = require('express');
const { Forest } = require('../database/schemas');

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


router.get('/:id', (req, res) => {
    const id = req.params.id;
    Forest.findById(id, (err, forest) => {
        if (err) {
            res.status(400).send({ message: 'Get forest failed', err });
        } else {
            res.send({ message: 'Forest retrieved successfully', forest });
        }
    });

});


module.exports = router;

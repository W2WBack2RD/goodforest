const express = require('express');
const { User } = require('../database/schemas');
const { Client } = require('@notionhq/client');

const client = new Client({ auth: process.env.NOTION_SECRET || '' });
const FORESTS_TABLE_ID = '0b9e33ef378a4d75be763aac32a5a88b'
const CITIES_TABLE_ID = '6121cf34409b49d39c8a2b0e0c7750d3'

const router = express.Router();

router.get('/', async (req, res) => {
    const citiesResponse = await client.databases.query({ database_id: CITIES_TABLE_ID })
    const cities = citiesResponse.results.map(city => ({
        id: city.id,
        name: city.properties['שם הרשות'].title[0].plain_text,
    }))

    client.databases.query({ database_id: FORESTS_TABLE_ID }).then(response => {
        const forests = response.results.map(forest => ({
            id: forest.id,
            forest_name: forest.properties['שם השטח'].title[0].plain_text,
            city: cities.find(city => city.id === forest.properties['רשות'].relation[0]?.id),
        }))
        res.send({ message: 'Forests retrieved successfully', forests });
    })
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    client.pages.retrieve({ page_id: id }).then(async (response) => {
        var users = await User.find({ forest: id })
        var usersCount = users?.length || 0;
        const forest = {
            id: response.id,
            forest_name: response.properties['שם השטח'].title[0].plain_text
        }
        res.send({ message: 'Forest retrieved successfully', forest, usersCount });
    })

});


module.exports = router;

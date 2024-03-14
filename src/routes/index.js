// src/routes/index.js

const fs = require('fs');
const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const content = require('../data/station.json');
const { findStationById, calculatePresenceScore, sortByAdjacency } = require('../utils/utils');



router.get('/', (req, res) => {
    //get content in file /data/station.json
    const container = content;
    const rer = container.rer;
    const metro = container.metro;
    const tramway = container.tram;
    const train = container.train;
    res.render('index', { title: 'Rien à Taper', rer: rer, metro: metro, tram: tramway, train: train });
});

router.get('/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    const key = `${type}_${id}`;
    const name = type + ' ' + id;
    const display_name = name.toUpperCase();
    if (content[type] && content[type][key]) {
        const rerData = content[type][key];
        res.render('display', { objects: rerData, title: display_name, type: type, id: id, sortAdj: sortByAdjacency });
    } else {
        res.status(404).send('Not found');
    }
});

router.post('/increment-control-level', (req, res) => {
    const { stationId } = req.body;

    // Find the station by ID
    const station = findStationById(content, stationId);

    if (!station) {
        return res.status(404).json({ error: 'Station not found' });
    }
    calculatePresenceScore(station, "presence");
    station.last_update = new Date().toISOString();
    fs.writeFileSync('./src/data/station.json', JSON.stringify(content, null, 2));
    res.json({ newControlLevel: station.control_level });
});

router.post('/decrement-control-level', (req, res) => {
    const { stationId } = req.body;

    // Find the station by ID
    const station = findStationById(content, stationId);

    if (!station) {
        return res.status(404).json({ error: 'Station not found' });
    }
    calculatePresenceScore(station, "absence");
    station.last_update = new Date().toISOString();
    fs.writeFileSync('./src/data/station.json', JSON.stringify(content, null, 2));
    res.json({ newControlLevel: station.control_level });
});

router.get('/:type', (req, res) => {
    const type = req.params.type;
    const container = content;
    const list = container[type];
    res.render('display_line', { title: type.toUpperCase(), objects: list });
});


module.exports = router;

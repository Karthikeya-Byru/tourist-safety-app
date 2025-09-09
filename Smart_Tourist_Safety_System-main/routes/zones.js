// placeholder for zones.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createZone, listZones, checkZone } = require('../controllers/zoneController');

router.post('/', auth, createZone);     // create zone (admin)
router.get('/', auth, listZones);       // list
router.post('/check', checkZone);       // public check if a point is inside any zone

module.exports = router;

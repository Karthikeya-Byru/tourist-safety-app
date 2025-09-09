// placeholder for incidents.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSOS, listIncidents } = require('../controllers/incidentController');

router.post('/sos', auth, createSOS);
router.get('/', auth, listIncidents);

module.exports = router;

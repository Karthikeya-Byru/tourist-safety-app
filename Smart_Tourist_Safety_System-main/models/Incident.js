// placeholder for Incident.js
const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  touristDid: { type: String },
  incidentType: { type: String, default: 'SOS' },
  message: { type: String },
  location: {
    lat: Number,
    lon: Number
  },
  status: { type: String, enum: ['open','assigned','resolved'], default: 'open' },
  riskLevel: { type: String, enum: ['Low','Medium','High','Unknown'], default: 'Unknown' },
  blockchainHash: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);

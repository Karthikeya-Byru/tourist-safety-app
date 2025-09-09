// placeholder for Zone.js
const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['restricted','caution','curfew','eco'], default: 'caution' },
  // simple circle representation for prototype
  center: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  radiusMeters: { type: Number, default: 100 }, // meters
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Zone', zoneSchema);

// Zone controller with MongoDB and File Database fallback
const Zone = require('../models/Zone');
const fileDB = require('./fileDatabase');

// Check if MongoDB is available
const isMongoAvailable = async () => {
  try {
    await Zone.findOne().limit(1).maxTimeMS(2000);
    return true;
  } catch (err) {
    return false;
  }
};

function toRad(x) { return x * Math.PI / 180; }
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

exports.createZone = async (req, res, next) => {
  try {
    const { name, type, center, radiusMeters } = req.body;
    const mongoAvailable = await isMongoAvailable();
    
    const zoneData = { name, type, center, radiusMeters, active: true, createdAt: new Date() };
    
    let zone;
    
    if (mongoAvailable) {
      // Use MongoDB
      zone = await Zone.create(zoneData);
    } else {
      // Use file database
      zoneData.id = Date.now().toString();
      zone = await fileDB.createZone(zoneData);
    }
    
    res.json(zone);
  } catch (err) { 
    console.error('Create zone error:', err);
    next(err); 
  }
};

exports.listZones = async (req, res, next) => {
  try {
    const mongoAvailable = await isMongoAvailable();
    
    let zones;
    
    if (mongoAvailable) {
      // Use MongoDB
      zones = await Zone.find({ active: true });
    } else {
      // Use file database
      const allZones = await fileDB.getAllZones();
      zones = allZones.filter(zone => zone.active !== false);
    }
    
    res.json(zones);
  } catch (err) { 
    console.error('List zones error:', err);
    next(err); 
  }
};

exports.checkZone = async (req, res, next) => {
  try {
    const { lat, lon } = req.body;
    if (lat == null || lon == null) return res.status(400).json({ message: 'lat/lon required' });

    const mongoAvailable = await isMongoAvailable();
    
    let zones;
    
    if (mongoAvailable) {
      // Use MongoDB
      zones = await Zone.find({ active: true });
    } else {
      // Use file database
      const allZones = await fileDB.getAllZones();
      zones = allZones.filter(zone => zone.active !== false);
    }
    
    const breaches = [];
    for (const z of zones) {
      const dist = haversine(lat, lon, z.center.lat, z.center.lon);
      if (dist <= (z.radiusMeters || 100)) {
        breaches.push({ zoneId: z._id || z.id, name: z.name, type: z.type, dist });
      }
    }
    res.json({ breaches });
  } catch (err) { 
    console.error('Check zone error:', err);
    next(err); 
  }
};

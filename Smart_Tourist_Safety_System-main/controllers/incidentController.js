// Incident controller with MongoDB and File Database fallback
const Incident = require('../models/Incident');
const { analyzeSOS } = require('../services/fastapiClient');
const { sha256 } = require('../utils/hash');
const { anchorHash } = require('../utils/blockchainMock');
const fileDB = require('./fileDatabase');

// Check if MongoDB is available
const isMongoAvailable = async () => {
  try {
    await Incident.findOne().limit(1).maxTimeMS(2000);
    return true;
  } catch (err) {
    return false;
  }
};

exports.createSOS = async (req, res, next) => {
  try {
    const { message, location } = req.body;
    const touristDid = req.user && req.user.did ? req.user.did : req.body.did || 'anonymous';
    const mongoAvailable = await isMongoAvailable();

    // analyze via FastAPI (or heuristics)
    const aiResult = await analyzeSOS(message || '');

    const incidentData = {
      touristDid,
      incidentType: 'SOS',
      message,
      location,
      riskLevel: aiResult.risk || 'Unknown',
      createdAt: new Date()
    };

    let incident;
    
    if (mongoAvailable) {
      // Use MongoDB
      incident = await Incident.create(incidentData);
      
      // create a hash of the incident for anchoring
      const incidentHash = sha256(JSON.stringify({
        id: incident._id,
        touristDid: incident.touristDid,
        createdAt: incident.createdAt
      }));

      // anchor on-chain (mock for prototype)
      const tx = await anchorHash(incidentHash);
      incident.blockchainHash = tx;
      await incident.save();
    } else {
      // Use file database
      incidentData.id = Date.now().toString();
      incidentData.blockchainHash = `mock_hash_${Date.now()}`;
      incident = await fileDB.createIncident(incidentData);
    }

    res.json({ incident, aiResult, tx: incident.blockchainHash });
  } catch (err) { 
    console.error('Create SOS error:', err);
    next(err); 
  }
};

exports.listIncidents = async (req, res, next) => {
  try {
    const mongoAvailable = await isMongoAvailable();
    
    let incidents;
    
    if (mongoAvailable) {
      // Use MongoDB
      incidents = await Incident.find().sort({ createdAt: -1 }).limit(200);
    } else {
      // Use file database
      const allIncidents = await fileDB.getAllIncidents();
      incidents = allIncidents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 200);
    }
    
    res.json(incidents);
  } catch (err) { 
    console.error('List incidents error:', err);
    next(err); 
  }
};

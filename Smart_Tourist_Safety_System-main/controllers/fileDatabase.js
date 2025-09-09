// Simple file-based database for local development
const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const INCIDENTS_FILE = path.join(DB_DIR, 'incidents.json');
const ZONES_FILE = path.join(DB_DIR, 'zones.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize files if they don't exist
const initFile = (filePath, defaultData = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initFile(USERS_FILE);
initFile(INCIDENTS_FILE);
initFile(ZONES_FILE);

const fileDB = {
  // User operations
  users: {
    findOne: (query) => {
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      return users.find(user => {
        if (query.email) return user.email === query.email;
        if (query._id) return user._id === query._id;
        return false;
      });
    },
    
    create: (userData) => {
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      const newUser = {
        _id: Date.now().toString(),
        ...userData,
        createdAt: new Date()
      };
      users.push(newUser);
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
      return newUser;
    },
    
    findById: (id) => {
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      return users.find(user => user._id === id);
    },
    
    findAll: () => {
      return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }
  },

  // Incident operations
  incidents: {
    create: (incidentData) => {
      const incidents = JSON.parse(fs.readFileSync(INCIDENTS_FILE, 'utf8'));
      const newIncident = {
        _id: Date.now().toString(),
        ...incidentData,
        createdAt: new Date()
      };
      incidents.push(newIncident);
      fs.writeFileSync(INCIDENTS_FILE, JSON.stringify(incidents, null, 2));
      return newIncident;
    },
    
    findAll: () => {
      const incidents = JSON.parse(fs.readFileSync(INCIDENTS_FILE, 'utf8'));
      return incidents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    updateById: (id, updateData) => {
      const incidents = JSON.parse(fs.readFileSync(INCIDENTS_FILE, 'utf8'));
      const index = incidents.findIndex(incident => incident._id === id);
      if (index !== -1) {
        incidents[index] = { ...incidents[index], ...updateData };
        fs.writeFileSync(INCIDENTS_FILE, JSON.stringify(incidents, null, 2));
        return incidents[index];
      }
      return null;
    }
  },

  // Zone operations
  zones: {
    create: (zoneData) => {
      const zones = JSON.parse(fs.readFileSync(ZONES_FILE, 'utf8'));
      const newZone = {
        _id: Date.now().toString(),
        ...zoneData,
        createdAt: new Date()
      };
      zones.push(newZone);
      fs.writeFileSync(ZONES_FILE, JSON.stringify(zones, null, 2));
      return newZone;
    },
    
    findAll: (filter = {}) => {
      const zones = JSON.parse(fs.readFileSync(ZONES_FILE, 'utf8'));
      if (filter.active !== undefined) {
        return zones.filter(zone => zone.active === filter.active);
      }
      return zones;
    }
  }
};

module.exports = fileDB;

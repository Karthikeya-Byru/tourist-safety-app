// Auth controller with MongoDB and File Database fallback
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateDID } = require('../utils/did');
const fallbackAuth = require('./fallbackAuth');
const fileDB = require('./fileDatabase');

// Check if MongoDB is available
const isMongoAvailable = async () => {
  // Temporarily disable MongoDB for stable development
  // Change this to true when you want to use MongoDB
  const USE_MONGODB = false;
  
  if (!USE_MONGODB) return false;
  
  try {
    // Quick connection state check first
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return false;
    }
    
    // If connected, do a quick ping
    await User.findOne().limit(1).maxTimeMS(500);
    return true;
  } catch (err) {
    return false;
  }
};

// Use file database as persistent fallback
const useFileDB = async (operation, req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    if (operation === 'register') {
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }
      
      const existing = fileDB.users.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'Email already used' });
      }
      
      const hashed = await bcrypt.hash(password, 10);
      const did = generateDID();
      const user = fileDB.users.create({ name, email, password: hashed, did });
      
      const token = jwt.sign({ id: user._id, did: user.did }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ 
        token, 
        user: { name: user.name, email: user.email, did: user.did },
        storage: 'file-database'
      });
    } else if (operation === 'login') {
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }
      
      const user = fileDB.users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ id: user._id, did: user.did }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ 
        token, 
        user: { name: user.name, email: user.email, did: user.did },
        storage: 'file-database'
      });
    } else if (operation === 'profile') {
      const user = fileDB.users.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    }
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    // Check if MongoDB is available
    const mongoAvailable = await isMongoAvailable();
    if (!mongoAvailable) {
      console.log('MongoDB not available, using file database');
      return useFileDB('register', req, res, next);
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);
    const did = generateDID();
    const user = await User.create({ name, email, password: hashed, did });

    const token = jwt.sign({ id: user._id, did: user.did }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { name: user.name, email: user.email, did: user.did },
      storage: 'mongodb'
    });
  } catch (err) { 
    console.log('MongoDB error, falling back to file database');
    return useFileDB('register', req, res, next);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Check if MongoDB is available
    const mongoAvailable = await isMongoAvailable();
    if (!mongoAvailable) {
      console.log('MongoDB not available, using file database');
      return useFileDB('login', req, res, next);
    }

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, did: user.did }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { name: user.name, email: user.email, did: user.did },
      storage: 'mongodb'
    });
  } catch (err) { 
    console.log('MongoDB error, falling back to file database');
    return useFileDB('login', req, res, next);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    // Check if MongoDB is available
    const mongoAvailable = await isMongoAvailable();
    if (!mongoAvailable) {
      console.log('MongoDB not available, using file database');
      return useFileDB('profile', req, res, next);
    }

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) { 
    console.log('MongoDB error, falling back to file database');
    return useFileDB('profile', req, res, next);
  }
};

// Get all users (for viewing/debugging)
exports.getAllUsers = async (req, res, next) => {
  try {
    // Check if MongoDB is available
    const mongoAvailable = await isMongoAvailable();
    
    let users;
    
    if (mongoAvailable) {
      // Use MongoDB - exclude passwords
      users = await User.find({}).select('-password').sort({ createdAt: -1 });
    } else {
      // Use file database
      users = await fileDB.users.findAll();
      // Remove passwords from file database results
      users = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    }
    
    res.json({
      success: true,
      count: users.length,
      data: users,
      source: mongoAvailable ? 'MongoDB' : 'File Database'
    });
  } catch (err) { 
    console.error('Get all users error:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: err.message
    });
  }
};

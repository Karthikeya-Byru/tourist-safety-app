// Fallback authentication for development (when MongoDB is not available)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateDID } = require('../utils/did');

// In-memory storage for development
let inMemoryUsers = [];

const fallbackAuth = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      // Check if user already exists
      const existing = inMemoryUsers.find(user => user.email === email);
      if (existing) {
        return res.status(400).json({ message: 'Email already used' });
      }

      const hashed = await bcrypt.hash(password, 10);
      const did = generateDID();
      const user = {
        _id: Date.now().toString(),
        name,
        email,
        password: hashed,
        did,
        createdAt: new Date()
      };

      inMemoryUsers.push(user);

      const token = jwt.sign({ id: user._id, did: user.did }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ 
        token, 
        user: { name: user.name, email: user.email, did: user.did },
        message: 'Registration successful (using fallback storage)'
      });
    } catch (err) { 
      next(err); 
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      const user = inMemoryUsers.find(user => user.email === email);
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
        message: 'Login successful (using fallback storage)'
      });
    } catch (err) { 
      next(err); 
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const user = inMemoryUsers.find(user => user._id === req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) { 
      next(err); 
    }
  },

  // Helper to get all users (for testing)
  getAllUsers: () => inMemoryUsers.map(user => ({ 
    id: user._id, 
    name: user.name, 
    email: user.email, 
    did: user.did,
    createdAt: user.createdAt
  }))
};

module.exports = fallbackAuth;

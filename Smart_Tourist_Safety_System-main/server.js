// placeholder for server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const zoneRoutes = require('./routes/zones');
const incidentRoutes = require('./routes/incidents');
const errorHandler = require('./middleware/errorHandler');

// Try to connect to MongoDB, but don't crash if it fails
connectDB().catch(err => {
  console.log('MongoDB connection failed, using file database fallback:', err.message);
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150
});
app.use(limiter);

// routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

app.get('/api/debug', (req, res) => {
  const fallbackAuth = require('./controllers/fallbackAuth');
  res.json({ 
    message: 'Debug info',
    users: fallbackAuth.getAllUsers(),
    mongoStatus: 'Using fallback storage',
    timestamp: new Date().toISOString() 
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/incidents', incidentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

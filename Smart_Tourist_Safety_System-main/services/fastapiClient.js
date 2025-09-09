// placeholder for fastapiClient.js
const axios = require('axios');

const FASTAPI_URL = process.env.FASTAPI_URL || '';

async function analyzeSOS(text) {
  if (!FASTAPI_URL) {
    // No FastAPI available — return a simple heuristic for prototype
    const lowwords = ['ok','fine','thanks','no'];
    const msg = text.toLowerCase();
    if (msg.includes('help') || msg.includes('injur') || msg.includes('danger')) {
      return { risk: 'High', action: 'Trigger SOS' };
    }
    return { risk: 'Low', action: 'No SOS' };
  }

  try {
    const resp = await axios.post(`${FASTAPI_URL}/analyze_sos`, { text });
    return resp.data;
  } catch (err) {
    console.error('FastAPI error:', err.message);
    return { risk: 'Unknown', action: 'Error' };
  }
}

module.exports = { analyzeSOS };

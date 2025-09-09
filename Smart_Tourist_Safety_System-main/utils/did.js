// placeholder for did.js
const { v4: uuidv4 } = require('uuid');

function generateDID() {
  // Prototype DID; replace later with real DID method (Indy/Aries/etc.)
  return `did:example:${uuidv4()}`;
}

module.exports = { generateDID };

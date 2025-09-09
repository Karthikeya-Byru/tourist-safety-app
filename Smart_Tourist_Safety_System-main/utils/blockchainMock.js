// placeholder for blockchainMock.js
const crypto = require('crypto');

async function anchorHash(hash) {
  // Mock: return deterministic "tx id" — replace with ethers/web3 later
  return 'tx_' + crypto.createHash('sha256').update(hash + Date.now()).digest('hex').slice(0, 16);
}

module.exports = { anchorHash };

const path = require('node:path');
module.exports = require('./load-typescript-module.cjs')(
  path.resolve(__dirname, '../src/composables/currentChainTransactions.ts')
);

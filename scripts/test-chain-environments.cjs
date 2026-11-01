const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
  const { loadEnv } = await import('vite');
  const root = path.resolve(__dirname, '..');
  const development = loadEnv('development', root);
  assert.equal(development.VITE_API_COSMOS, 'https://lxgr.xyz:1318');
  assert.equal(development.VITE_WS_TENDERMINT, 'https://lxgr.xyz:26658');
  assert.equal(development.VITE_APP_CHAIN_ID, 'cardtestnet-14');
  assert.equal(development.VITE_APP_DEVELOPMENT_CHAIN_API, 'true');
  const production = loadEnv('production', root);
  assert.equal(production.VITE_API_COSMOS, 'https://cardchain.crowdcontrol.network/cosmos/');
  assert.equal(production.VITE_APP_CHAIN_ID, 'cardtestnet-13');
  assert.notEqual(production.VITE_APP_DEVELOPMENT_CHAIN_API, 'true');
  console.log('PASS: lxgr development uses its HTTPS endpoints and REST adapter; production retains its legacy API configuration.');
})().catch(error => { console.error(error); process.exitCode = 1; });

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const protobuf = require('protobufjs');
const [chain, sdk] = process.argv.slice(2);
if (!chain || !sdk) throw new Error('Usage: node scripts/generate-current-chain-proto.cjs CARDCHAIN_ROOT COSMOS_SDK_ROOT');
const root = new protobuf.Root();
const sources = {};
function load(relative) {
  if (sources[relative]) return;
  const base = relative.startsWith('cardchain/') ? chain : sdk;
  const file = path.join(base, 'proto', relative);
  const text = fs.readFileSync(file, 'utf8');
  sources[relative] = crypto.createHash('sha256').update(text).digest('hex');
  const parsed = protobuf.parse(text, root);
  for (const dependency of parsed.imports || []) {
    if (dependency.startsWith('cardchain/') || dependency === 'cosmos/base/v1beta1/coin.proto') load(dependency);
    else if (dependency.startsWith('google/protobuf/')) {
      const common = protobuf.common[dependency];
      if (!common) throw new Error('Unknown dependency '+dependency);
      root.addJSON(common.nested);
    } else if (!/^(amino|cosmos_proto|gogoproto|cosmos\/msg)\//.test(dependency)) {
      throw new Error('Unreviewed dependency '+dependency);
    }
  }
}
load('cardchain/cardchain/tx.proto');
root.resolveAll();
const out = path.join(__dirname, '../src/generated');
fs.mkdirSync(out, {recursive:true});
fs.writeFileSync(path.join(out,'current-chain-proto.json'), JSON.stringify(root.toJSON(),null,2)+'\n');
fs.writeFileSync(path.join(out,'current-chain-proto.sources.json'), JSON.stringify(sources,null,2)+'\n');
console.log('Generated current protobuf descriptor from',Object.keys(sources).length,'source files.');

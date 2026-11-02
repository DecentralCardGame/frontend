const fs = require('node:fs');
const [sourcePath, basePath, outputPath] = process.argv.slice(2);
if (!outputPath) throw new Error('Usage: node scripts/sync-keyword-descriptions.cjs GENERATED_CARDOBJECT_SCHEMA BASE_FRONTEND_SCHEMA OUTPUT');
const source = JSON.parse(fs.readFileSync(sourcePath,'utf8'));
const base = JSON.parse(fs.readFileSync(basePath,'utf8'));
let changed = 0;
for (const [name, definition] of Object.entries(base.definitions)) {
  const incoming = source.definitions[name];
  if (!incoming) throw new Error('Missing definition '+name);
  if (incoming.description !== definition.description) {
    if (typeof incoming.description !== 'string') throw new Error('Invalid description '+name);
    definition.description = incoming.description;
    changed++;
  }
}
fs.writeFileSync(outputPath,JSON.stringify(base)+'\n');
console.log(`Updated ${changed} descriptions; preserved the deployed grammar, class permissions and interaction texts.`);

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const icons = path.join(root, 'public/icon/abilities');
const definitions = JSON.parse(fs.readFileSync(path.join(root, 'src/def-composables/cardRules.json'), 'utf8')).definitions;
let checked = 0;
for (const kind of ['effect', 'ability']) {
  for (const [name, ref] of Object.entries(definitions[kind].children)) {
    const option = definitions[ref.$ref.split('/').at(-1)];
    const filename = option.name.replace(/ /g, '').split('-')[0].toLowerCase() + '.svg';
    assert.ok(fs.existsSync(path.join(icons, filename)), `${name}: missing ${filename}`);
    checked++;
  }
}
const hashes = require('../docs/keyword-icons.sha256.json');
for (const [filename, expected] of Object.entries(hashes)) {
  const bytes = fs.readFileSync(path.join(icons, filename));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), expected, filename);
  const svg = bytes.toString('utf8');
  assert.match(svg, /viewBox="0 0 500 500"/, filename);
  assert.doesNotMatch(svg, /<(?:script|image|foreignObject)\b|\bon\w+\s*=|\b(?:xlink:)?href\s*=/i, filename);
}
console.log(`PASS: all ${checked} schema effects/abilities have icon files; ${Object.keys(hashes).length} imported SVGs match the handoff hashes and are self-contained.`);

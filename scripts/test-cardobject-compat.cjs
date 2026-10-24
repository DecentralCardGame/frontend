const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildSync } = require('esbuild');
const root = path.resolve(__dirname, '..');
const schema = JSON.parse(fs.readFileSync(path.join(root, 'src/def-composables/cardRules.json')));

// Exercise the actual editor helpers and outgoing model without a wallet or transaction.
const compiled = buildSync({
  stdin: { contents: `export { Card } from './src/model/Card'; export { createInteraction } from './src/components/utils/utils'; export { resolveCardRules } from './src/def-composables/resolveCardRules';`, resolveDir: root, loader: 'ts' },
  bundle: true, write: false, platform: 'node', format: 'cjs',
}).outputFiles[0].text;
const loaded = { exports: {} };
new Function('module', 'exports', 'require', compiled)(loaded, loaded.exports, require);
const { Card, createInteraction, resolveCardRules } = loaded.exports;

(async () => {
  const result = resolveCardRules(schema);
  const definitions = result.definitions;
  const effects = result.Card.children.Action.children.Effects.children.Effect;
  assert.equal(effects, definitions.effect);
  assert.equal(effects.children.Reprogram.children.Effect, effects);
  assert.equal(effects.children.Requiem.children.Effects.children.Effect, effects);
  assert.throws(() => resolveCardRules({Card: {$ref: '#/definitions/missing'}, definitions: {}}));
  const log = console.log;
  console.log = () => {};
  try {
    for (const [name, definition] of Object.entries(definitions)) {
      if (!definition.interactionText) continue;
      for (const [, field] of definition.interactionText.matchAll(/§([A-Za-z]+)/g)) {
        assert.ok(field in definition.children, `${name}: missing ${field}`);
      }
      assert.ok(createInteraction(definition.interactionText, [], [], definition.children).length);
    }
    for (const name of ['sacrifice', 'discountAction', 'discountEntity', 'discountPlace']) {
      assert.deepEqual(definitions[name].children, {});
      assert.ok(!definitions[name].interactionText.includes('§'));
    }
    assert.deepEqual(Object.keys(definitions.cleanse.children), ['Amount']);
    assert.equal(definitions.countDust.interactionText, 'Count §CardType Dust -> X.');
    assert.equal(definitions.avatar.interactionText, 'X/X Avatar');
    assert.equal(definitions.beast.interactionText, '3/3 Beast');
    assert.equal(definitions.spirit.interactionText, '1/1 Spirit');
    for (const name of ['criticality', 'onDestruction', 'onDiscard', 'requiem', 'incrementX', 'resetX']) {
      assert.ok(definitions[name], name);
    }
    assert.ok(definitions.EntityMode.enum.includes('CHOSENENTITY'));
    assert.ok(definitions.PlaceMode.enum.includes('CHOSENPLACE'));
    const effects = [{ Sacrifice: {} }, { DiscountAction: {} }, { Cleanse: { Amount: { SimpleIntValue: 3 } } },
      { Suffer: { Target: 'CHOSENENTITY', Amount: { IntVariable: 'X' } } }];
    for (const type of ['Action', 'Entity', 'Place', 'Headquarter']) {
      const card = new Card();
      Object.assign(card, { type, CardName: 'Schema test', CastingCost: 1, Health: 3, Attack: 2, Delay: 1, Tags: ['HUMAN'],
        Effects: effects, Abilities: [{ OnSpawn: { Effects: effects } }] });
      const content = JSON.parse(JSON.stringify(card.toChainCard().content))[type];
      const definition = result.Card.children[type];
      for (const field of Object.keys(content)) assert.ok(field in definition.children, `${type}: unexpected ${field}`);
      for (const field of definition.required) assert.ok(field in content, `${type}: missing ${field}`);
      assert.ok(!('RulesTexts' in content));
      assert.deepEqual(type === 'Action' ? content.Effects : content.Abilities[0].OnSpawn.Effects, effects);
    }
  } finally { console.log = log; }
  console.log('PASS: schema placeholders, editor interactions, keyword parameters and serialization for all four card types.');
})().catch(error => { console.error(error); process.exitCode = 1; });

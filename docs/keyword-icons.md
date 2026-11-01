# Keyword icon handoff

The 19 SVGs listed in `keyword-icons.sha256.json` are byte-identical copies from
`DecentralCardGame/gameclient` commit `7d2c8450480a6c3d78a8c89f1a3a7fd63a330692`,
`docs/keyword-icon-handoff/`. Only filenames were lowercased to match
`AbilityModal.vue`'s existing URL convention.

Existing Ambush, Ravage and Requiem assets are deliberately preserved. The source
handoff's alternative designs for those keywords were not imported.

The imported artwork consists of black glyphs on transparent backgrounds with a
500×500 viewBox. These are the supplied project drafts, not newly commissioned or
independently approved final artwork. Salvage reuses the gameclient's existing
`Assets/UI/Style/Images/abilityicons/12 - salvage 01.svg` geometry with explicit
black fill. The source handoff does not claim independent license clearance for
that reused geometry; this integration makes no such claim either.

Run `node scripts/test-keyword-icons.cjs` to check all schema effect/ability icon
paths and the imported SVG hashes. The test also rejects embedded images,
external references and executable content in these newly imported files.

This change does not update Cardobject classes, card JSON, chain endpoints or
Unity files. Before deploying this branch to lxgr, include the configuration fix
from frontend PR #354; the historical development configuration on master still
points to the wrong endpoints until that PR is merged.

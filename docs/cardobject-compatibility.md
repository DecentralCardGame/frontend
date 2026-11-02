# Keyword-foundation Cardobject compatibility

This integration covers schema/editor compatibility, opt-in current-chain REST and
transaction adapters, and the existing gallery's broken infinite scrolling. It does not add Run Deck /
All-Star UI, change the frame economy, or modify the gameclient.

`src/def-composables/cardRules.json` retains the grammar, class permissions and interaction
texts from merged Cardobject master commit **`dad764e41bae3da9e929a34f32193c7f6f84e9b4`**
(Cardobject PR #107). The 20 subsequently approved descriptions are recorded in
`approved-keyword-descriptions.json` and synchronized from Cardobject commit
`3cb0a830af0a3896f4c91dd56d88ea94e97c68c8` (PR #108)'s generated schema
using `scripts/sync-keyword-descriptions.cjs SOURCE_SCHEMA BASE_FRONTEND_SCHEMA OUTPUT`.
This deliberately updates descriptions only: the separately approved Body Count/Autopsy
class expansions must not be activated incidentally before the deployed chain supports them.
Cardobject's schemas themselves must be regenerated through its existing Go generator tests.

The schema resolver retains shared/circular references for recursive definitions such as
Reprogram and Requiem. Leaving those references unresolved makes the effect picker empty.
The serialized card model emits only fields belonging to the selected card type, without
legacy RulesTexts. Typed CHOSEN targets remain unchanged in JSON; only displayed rule text
uses CHOSEN. Sacrifice and the three Discount effects have no parameter buttons; Cleanse
has only Amount.

For the Cardchain development API, set `VITE_APP_DEVELOPMENT_CHAIN_API=true` together with
the intended chain ID and REST/RPC endpoints in the appropriate Vite environment. Without
that explicit flag, neither the REST nor the transaction adapter is installed. The current
transaction adapter uses the actual current protobuf definitions and a separately aliased
CosmJS client; the production legacy client remains in place. See
`current-chain-transactions.md` for supported methods, signing tests and limitations.

The gallery listens for captured scroll events from its overflow panel and checks the panel's
visible lower edge. It also rechecks after an asynchronous batch is rendered, so loading does
not depend on receiving another window scroll event.

Verification:

```sh
node scripts/test-cardobject-compat.cjs
npm run build
```

The compatibility test exercises actual editor interaction construction, recursive reference
identity, parameterless effects and typed fields, and serialized output for all four card types.
Browser checks additionally exercise the real AbilityModal, gallery rendering and scrolling.
Local review HTML pages, local endpoint overrides, keys and snapshots are not part of this PR.

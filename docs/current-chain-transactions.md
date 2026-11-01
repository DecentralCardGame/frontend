# Current-chain transaction compatibility

The explicit `VITE_APP_DEVELOPMENT_CHAIN_API=true` switch enables both REST adaptation
and the current transaction path. `.env.development` selects lxgr/cardtestnet-14;
production retains its legacy SDK and message names. This is not a chain upgrade.

## Protocol source

`src/generated/current-chain-proto.json` is generated from Cardchain commit
`fa68808db06201d7102d614c37fc8f18ce08c54a` and Cosmos SDK v0.53.5. The companion
`.sources.json` records every input proto's SHA-256. Regenerate with:

```sh
node scripts/generate-current-chain-proto.cjs /path/to/Cardchain /path/to/cosmos-sdk
```

The generator follows the transaction proto's model imports, preserving field numbers,
wire types, enums and nested message definitions. Go-only/Amino/signer annotations are
parsed as metadata; their annotation imports are not needed for JS wire encoding.
Unexpected imports fail rather than being silently omitted.

The 22 mappings in `currentChainTransactions.ts` cover every Cardchain transaction
currently exposed through `useTx.ts`, plus the four existing gameclient authorization
message names. Unknown methods/fields/enums and unsafe numeric IDs fail closed.
The authz change updates permission type URLs only; it does not modify the gameclient.

Notable differences:
- SaveCardContent → `/cardchain.cardchain.MsgCardSaveContent`, content as UTF-8 bytes.
- AddArtwork → `/cardchain.cardchain.MsgCardArtworkAdd`, image as bytes. The existing
  image data-URL representation is retained, not double-base64 encoded.
- CardVote contains a nested SingleVote, rather than flattened cardId/voteType.
- EncounterCreate uses drawlist and repeated key/value Parameter messages.
- EncounterDo/Close use their own methods on the current chain, not EncounterCreate.
- Card parameters survive the editor model roundtrip and saving.

CosmJS 0.39.0 is installed under `*-current` aliases so the legacy production imports
remain at their existing versions. Current-chain signing requires an offline direct
signer, matches creator to an account supplied by that signer, checks the RPC chain ID
before signing and disconnects the temporary client afterwards. Amino-only wallets are
not supported for current custom messages; they receive an explicit error. Signer
connect/disconnect events reinstall the current methods after the legacy SDK refreshes
its module. No private keys or production transactions are used by the tests.

## Verification

```sh
node scripts/test-current-transactions.cjs
node scripts/test-transaction-client-isolation.cjs
node scripts/test-cardobject-compat.cjs
node scripts/test-chain-environments.cjs
npm run build
npm run build:dev
```

Independent Go decoder check (run the second command from the pinned Cardchain checkout):

```sh
TX_FIXTURES_OUT=/tmp/current-tx.json node scripts/test-current-transactions.cjs
go run /path/to/frontend/scripts/verify-current-tx-fixtures.go /tmp/current-tx.json
```

Signed local integration test:

```sh
python3 scripts/test-current-transactions-e2e.py --binary /path/to/cardchaind
```

It starts its own fresh chain on loopback ports 27656/27657/1417/9190, using only newly
created test accounts. It sends actual signed save-content and artwork transactions,
queries the resulting content/image/Unicode/parameters, checks an unauthorized artist
attempt, and verifies signer and chain-ID guards. It stops its own node on completion.
Temporary test homes contain disposable private keys and must not be published.

The codec tests independently cover all 22 mapped message types; the signed integration
test proves state changes for save-content/artwork, not business-rule success for every
council, voting or encounter operation. Real Keplr/hardware-wallet signing against lxgr
still requires owner-controlled testing; no real player's wallet has been used here.

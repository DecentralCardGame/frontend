"use strict";
// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
Object.defineProperty(exports, "__esModule", { value: true });
const DecentralCardGame_cardchain_cardchain_1 = require("./DecentralCardGame/Cardchain/DecentralCardGame.cardchain.cardchain");
const cosmos_auth_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.auth.v1beta1");
const cosmos_authz_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.authz.v1beta1");
const cosmos_bank_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.bank.v1beta1");
const cosmos_base_tendermint_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.base.tendermint.v1beta1");
const cosmos_distribution_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.distribution.v1beta1");
const cosmos_evidence_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.evidence.v1beta1");
const cosmos_feegrant_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.feegrant.v1beta1");
const cosmos_params_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.params.v1beta1");
const cosmos_slashing_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.slashing.v1beta1");
const cosmos_tx_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.tx.v1beta1");
const cosmos_upgrade_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.upgrade.v1beta1");
const cosmos_vesting_v1beta1_1 = require("./cosmos/cosmos-sdk/cosmos.vesting.v1beta1");
const ibc_applications_transfer_v1_1 = require("./cosmos/ibc-go/ibc.applications.transfer.v1");
const ibc_core_channel_v1_1 = require("./cosmos/ibc-go/ibc.core.channel.v1");
const ibc_core_client_v1_1 = require("./cosmos/ibc-go/ibc.core.client.v1");
const ibc_core_connection_v1_1 = require("./cosmos/ibc-go/ibc.core.connection.v1");
exports.default = {
    DecentralCardGameCardchainDecentralCardGameCardchainCardchain: load(DecentralCardGame_cardchain_cardchain_1.default, 'DecentralCardGame.cardchain.cardchain'),
    CosmosCosmosSdkCosmosAuthV1Beta1: load(cosmos_auth_v1beta1_1.default, 'cosmos.auth.v1beta1'),
    CosmosCosmosSdkCosmosAuthzV1Beta1: load(cosmos_authz_v1beta1_1.default, 'cosmos.authz.v1beta1'),
    CosmosCosmosSdkCosmosBankV1Beta1: load(cosmos_bank_v1beta1_1.default, 'cosmos.bank.v1beta1'),
    CosmosCosmosSdkCosmosBaseTendermintV1Beta1: load(cosmos_base_tendermint_v1beta1_1.default, 'cosmos.base.tendermint.v1beta1'),
    CosmosCosmosSdkCosmosDistributionV1Beta1: load(cosmos_distribution_v1beta1_1.default, 'cosmos.distribution.v1beta1'),
    CosmosCosmosSdkCosmosEvidenceV1Beta1: load(cosmos_evidence_v1beta1_1.default, 'cosmos.evidence.v1beta1'),
    CosmosCosmosSdkCosmosFeegrantV1Beta1: load(cosmos_feegrant_v1beta1_1.default, 'cosmos.feegrant.v1beta1'),
    CosmosCosmosSdkCosmosParamsV1Beta1: load(cosmos_params_v1beta1_1.default, 'cosmos.params.v1beta1'),
    CosmosCosmosSdkCosmosSlashingV1Beta1: load(cosmos_slashing_v1beta1_1.default, 'cosmos.slashing.v1beta1'),
    CosmosCosmosSdkCosmosTxV1Beta1: load(cosmos_tx_v1beta1_1.default, 'cosmos.tx.v1beta1'),
    CosmosCosmosSdkCosmosUpgradeV1Beta1: load(cosmos_upgrade_v1beta1_1.default, 'cosmos.upgrade.v1beta1'),
    CosmosCosmosSdkCosmosVestingV1Beta1: load(cosmos_vesting_v1beta1_1.default, 'cosmos.vesting.v1beta1'),
    CosmosIbcGoIbcApplicationsTransferV1: load(ibc_applications_transfer_v1_1.default, 'ibc.applications.transfer.v1'),
    CosmosIbcGoIbcCoreChannelV1: load(ibc_core_channel_v1_1.default, 'ibc.core.channel.v1'),
    CosmosIbcGoIbcCoreClientV1: load(ibc_core_client_v1_1.default, 'ibc.core.client.v1'),
    CosmosIbcGoIbcCoreConnectionV1: load(ibc_core_connection_v1_1.default, 'ibc.core.connection.v1'),
};
function load(mod, fullns) {
    return function init(store) {
        if (store.hasModule([fullns])) {
            throw new Error('Duplicate module name detected: ' + fullns);
        }
        else {
            store.registerModule([fullns], mod);
            store.subscribe((mutation) => {
                if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
                    store.dispatch(fullns + '/init', null, {
                        root: true
                    });
                }
            });
        }
    };
}

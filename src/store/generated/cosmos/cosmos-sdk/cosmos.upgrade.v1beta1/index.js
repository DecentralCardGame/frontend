"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleVersion = exports.CancelSoftwareUpgradeProposal = exports.SoftwareUpgradeProposal = exports.Plan = void 0;
const module_1 = require("./module");
const upgrade_1 = require("./module/types/cosmos/upgrade/v1beta1/upgrade");
Object.defineProperty(exports, "Plan", { enumerable: true, get: function () { return upgrade_1.Plan; } });
const upgrade_2 = require("./module/types/cosmos/upgrade/v1beta1/upgrade");
Object.defineProperty(exports, "SoftwareUpgradeProposal", { enumerable: true, get: function () { return upgrade_2.SoftwareUpgradeProposal; } });
const upgrade_3 = require("./module/types/cosmos/upgrade/v1beta1/upgrade");
Object.defineProperty(exports, "CancelSoftwareUpgradeProposal", { enumerable: true, get: function () { return upgrade_3.CancelSoftwareUpgradeProposal; } });
const upgrade_4 = require("./module/types/cosmos/upgrade/v1beta1/upgrade");
Object.defineProperty(exports, "ModuleVersion", { enumerable: true, get: function () { return upgrade_4.ModuleVersion; } });
async function initTxClient(vuexGetters) {
    return await (0, module_1.txClient)(vuexGetters['common/wallet/signer'], {
        addr: vuexGetters['common/env/apiTendermint']
    });
}
async function initQueryClient(vuexGetters) {
    return await (0, module_1.queryClient)({
        addr: vuexGetters['common/env/apiCosmos']
    });
}
function mergeResults(value, next_values) {
    for (let prop of Object.keys(next_values)) {
        if (Array.isArray(next_values[prop])) {
            value[prop] = [...value[prop], ...next_values[prop]];
        }
        else {
            value[prop] = next_values[prop];
        }
    }
    return value;
}
function getStructure(template) {
    let structure = { fields: [] };
    for (const [key, value] of Object.entries(template)) {
        let field = {};
        field.name = key;
        field.type = typeof value;
        structure.fields.push(field);
    }
    return structure;
}
const getDefaultState = () => {
    return {
        CurrentPlan: {},
        AppliedPlan: {},
        UpgradedConsensusState: {},
        ModuleVersions: {},
        _Structure: {
            Plan: getStructure(upgrade_1.Plan.fromPartial({})),
            SoftwareUpgradeProposal: getStructure(upgrade_2.SoftwareUpgradeProposal.fromPartial({})),
            CancelSoftwareUpgradeProposal: getStructure(upgrade_3.CancelSoftwareUpgradeProposal.fromPartial({})),
            ModuleVersion: getStructure(upgrade_4.ModuleVersion.fromPartial({})),
        },
        _Registry: module_1.registry,
        _Subscriptions: new Set(),
    };
};
// initial state
const state = getDefaultState();
exports.default = {
    namespaced: true,
    state,
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState());
        },
        QUERY(state, { query, key, value }) {
            state[query][JSON.stringify(key)] = value;
        },
        SUBSCRIBE(state, subscription) {
            state._Subscriptions.add(JSON.stringify(subscription));
        },
        UNSUBSCRIBE(state, subscription) {
            state._Subscriptions.delete(JSON.stringify(subscription));
        }
    },
    getters: {
        getCurrentPlan: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.CurrentPlan[JSON.stringify(params)] ?? {};
        },
        getAppliedPlan: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.AppliedPlan[JSON.stringify(params)] ?? {};
        },
        getUpgradedConsensusState: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.UpgradedConsensusState[JSON.stringify(params)] ?? {};
        },
        getModuleVersions: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ModuleVersions[JSON.stringify(params)] ?? {};
        },
        getTypeStructure: (state) => (type) => {
            return state._Structure[type].fields;
        },
        getRegistry: (state) => {
            return state._Registry;
        }
    },
    actions: {
        init({ dispatch, rootGetters }) {
            console.log('Vuex module: cosmos.upgrade.v1beta1 initialized!');
            if (rootGetters['common/env/client']) {
                rootGetters['common/env/client'].on('newblock', () => {
                    dispatch('StoreUpdate');
                });
            }
        },
        resetState({ commit }) {
            commit('RESET_STATE');
        },
        unsubscribe({ commit }, subscription) {
            commit('UNSUBSCRIBE', subscription);
        },
        async StoreUpdate({ state, dispatch }) {
            state._Subscriptions.forEach(async (subscription) => {
                try {
                    const sub = JSON.parse(subscription);
                    await dispatch(sub.action, sub.payload);
                }
                catch (e) {
                    throw new Error('Subscriptions: ' + e.message);
                }
            });
        },
        async QueryCurrentPlan({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryCurrentPlan()).data;
                commit('QUERY', { query: 'CurrentPlan', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryCurrentPlan', payload: { options: { all }, params: { ...key }, query } });
                return getters['getCurrentPlan']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryCurrentPlan API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryAppliedPlan({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryAppliedPlan(key.name)).data;
                commit('QUERY', { query: 'AppliedPlan', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryAppliedPlan', payload: { options: { all }, params: { ...key }, query } });
                return getters['getAppliedPlan']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryAppliedPlan API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryUpgradedConsensusState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryUpgradedConsensusState(key.last_height)).data;
                commit('QUERY', { query: 'UpgradedConsensusState', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryUpgradedConsensusState', payload: { options: { all }, params: { ...key }, query } });
                return getters['getUpgradedConsensusState']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryUpgradedConsensusState API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryModuleVersions({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryModuleVersions(query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.queryModuleVersions({ ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'ModuleVersions', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryModuleVersions', payload: { options: { all }, params: { ...key }, query } });
                return getters['getModuleVersions']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryModuleVersions API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
    }
};
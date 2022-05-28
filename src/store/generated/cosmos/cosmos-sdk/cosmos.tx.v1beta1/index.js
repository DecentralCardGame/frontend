"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = exports.ModeInfo_Multi = exports.ModeInfo_Single = exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.SignDoc = exports.TxRaw = exports.Tx = void 0;
const module_1 = require("./module");
const tx_1 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "Tx", { enumerable: true, get: function () { return tx_1.Tx; } });
const tx_2 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "TxRaw", { enumerable: true, get: function () { return tx_2.TxRaw; } });
const tx_3 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "SignDoc", { enumerable: true, get: function () { return tx_3.SignDoc; } });
const tx_4 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "TxBody", { enumerable: true, get: function () { return tx_4.TxBody; } });
const tx_5 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "AuthInfo", { enumerable: true, get: function () { return tx_5.AuthInfo; } });
const tx_6 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "SignerInfo", { enumerable: true, get: function () { return tx_6.SignerInfo; } });
const tx_7 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "ModeInfo", { enumerable: true, get: function () { return tx_7.ModeInfo; } });
const tx_8 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "ModeInfo_Single", { enumerable: true, get: function () { return tx_8.ModeInfo_Single; } });
const tx_9 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "ModeInfo_Multi", { enumerable: true, get: function () { return tx_9.ModeInfo_Multi; } });
const tx_10 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "Fee", { enumerable: true, get: function () { return tx_10.Fee; } });
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
        Simulate: {},
        GetTx: {},
        BroadcastTx: {},
        GetTxsEvent: {},
        _Structure: {
            Tx: getStructure(tx_1.Tx.fromPartial({})),
            TxRaw: getStructure(tx_2.TxRaw.fromPartial({})),
            SignDoc: getStructure(tx_3.SignDoc.fromPartial({})),
            TxBody: getStructure(tx_4.TxBody.fromPartial({})),
            AuthInfo: getStructure(tx_5.AuthInfo.fromPartial({})),
            SignerInfo: getStructure(tx_6.SignerInfo.fromPartial({})),
            ModeInfo: getStructure(tx_7.ModeInfo.fromPartial({})),
            ModeInfo_Single: getStructure(tx_8.ModeInfo_Single.fromPartial({})),
            ModeInfo_Multi: getStructure(tx_9.ModeInfo_Multi.fromPartial({})),
            Fee: getStructure(tx_10.Fee.fromPartial({})),
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
        getSimulate: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Simulate[JSON.stringify(params)] ?? {};
        },
        getGetTx: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.GetTx[JSON.stringify(params)] ?? {};
        },
        getBroadcastTx: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.BroadcastTx[JSON.stringify(params)] ?? {};
        },
        getGetTxsEvent: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.GetTxsEvent[JSON.stringify(params)] ?? {};
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
            console.log('Vuex module: cosmos.tx.v1beta1 initialized!');
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
        async ServiceSimulate({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.serviceSimulate({ ...key })).data;
                commit('QUERY', { query: 'Simulate', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'ServiceSimulate', payload: { options: { all }, params: { ...key }, query } });
                return getters['getSimulate']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:ServiceSimulate API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async ServiceGetTx({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.serviceGetTx(key.hash)).data;
                commit('QUERY', { query: 'GetTx', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'ServiceGetTx', payload: { options: { all }, params: { ...key }, query } });
                return getters['getGetTx']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:ServiceGetTx API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async ServiceBroadcastTx({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.serviceBroadcastTx({ ...key })).data;
                commit('QUERY', { query: 'BroadcastTx', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'ServiceBroadcastTx', payload: { options: { all }, params: { ...key }, query } });
                return getters['getBroadcastTx']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:ServiceBroadcastTx API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async ServiceGetTxsEvent({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.serviceGetTxsEvent(query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.serviceGetTxsEvent({ ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'GetTxsEvent', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'ServiceGetTxsEvent', payload: { options: { all }, params: { ...key }, query } });
                return getters['getGetTxsEvent']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:ServiceGetTxsEvent API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
    }
};

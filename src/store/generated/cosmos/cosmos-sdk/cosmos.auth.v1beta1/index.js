"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.ModuleAccount = exports.BaseAccount = void 0;
const module_1 = require("./module");
const auth_1 = require("./module/types/cosmos/auth/v1beta1/auth");
Object.defineProperty(exports, "BaseAccount", { enumerable: true, get: function () { return auth_1.BaseAccount; } });
const auth_2 = require("./module/types/cosmos/auth/v1beta1/auth");
Object.defineProperty(exports, "ModuleAccount", { enumerable: true, get: function () { return auth_2.ModuleAccount; } });
const auth_3 = require("./module/types/cosmos/auth/v1beta1/auth");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return auth_3.Params; } });
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
        Accounts: {},
        Account: {},
        Params: {},
        _Structure: {
            BaseAccount: getStructure(auth_1.BaseAccount.fromPartial({})),
            ModuleAccount: getStructure(auth_2.ModuleAccount.fromPartial({})),
            Params: getStructure(auth_3.Params.fromPartial({})),
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
        getAccounts: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Accounts[JSON.stringify(params)] ?? {};
        },
        getAccount: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Account[JSON.stringify(params)] ?? {};
        },
        getParams: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Params[JSON.stringify(params)] ?? {};
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
            console.log('Vuex module: cosmos.auth.v1beta1 initialized!');
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
        async QueryAccounts({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryAccounts(query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.queryAccounts({ ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'Accounts', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryAccounts', payload: { options: { all }, params: { ...key }, query } });
                return getters['getAccounts']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryAccounts API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryAccount({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryAccount(key.address)).data;
                commit('QUERY', { query: 'Account', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryAccount', payload: { options: { all }, params: { ...key }, query } });
                return getters['getAccount']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryAccount API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryParams()).data;
                commit('QUERY', { query: 'Params', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: { ...key }, query } });
                return getters['getParams']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSequence = exports.Acknowledgement = exports.PacketState = exports.Packet = exports.Counterparty = exports.IdentifiedChannel = exports.Channel = void 0;
const module_1 = require("./module");
const channel_1 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return channel_1.Channel; } });
const channel_2 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "IdentifiedChannel", { enumerable: true, get: function () { return channel_2.IdentifiedChannel; } });
const channel_3 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Counterparty", { enumerable: true, get: function () { return channel_3.Counterparty; } });
const channel_4 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Packet", { enumerable: true, get: function () { return channel_4.Packet; } });
const channel_5 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "PacketState", { enumerable: true, get: function () { return channel_5.PacketState; } });
const channel_6 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Acknowledgement", { enumerable: true, get: function () { return channel_6.Acknowledgement; } });
const genesis_1 = require("./module/types/ibc/core/channel/v1/genesis");
Object.defineProperty(exports, "PacketSequence", { enumerable: true, get: function () { return genesis_1.PacketSequence; } });
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
        Channel: {},
        Channels: {},
        ConnectionChannels: {},
        ChannelClientState: {},
        ChannelConsensusState: {},
        PacketCommitment: {},
        PacketCommitments: {},
        PacketReceipt: {},
        PacketAcknowledgement: {},
        PacketAcknowledgements: {},
        UnreceivedPackets: {},
        UnreceivedAcks: {},
        NextSequenceReceive: {},
        _Structure: {
            Channel: getStructure(channel_1.Channel.fromPartial({})),
            IdentifiedChannel: getStructure(channel_2.IdentifiedChannel.fromPartial({})),
            Counterparty: getStructure(channel_3.Counterparty.fromPartial({})),
            Packet: getStructure(channel_4.Packet.fromPartial({})),
            PacketState: getStructure(channel_5.PacketState.fromPartial({})),
            Acknowledgement: getStructure(channel_6.Acknowledgement.fromPartial({})),
            PacketSequence: getStructure(genesis_1.PacketSequence.fromPartial({})),
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
        getChannel: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Channel[JSON.stringify(params)] ?? {};
        },
        getChannels: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Channels[JSON.stringify(params)] ?? {};
        },
        getConnectionChannels: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ConnectionChannels[JSON.stringify(params)] ?? {};
        },
        getChannelClientState: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ChannelClientState[JSON.stringify(params)] ?? {};
        },
        getChannelConsensusState: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ChannelConsensusState[JSON.stringify(params)] ?? {};
        },
        getPacketCommitment: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.PacketCommitment[JSON.stringify(params)] ?? {};
        },
        getPacketCommitments: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.PacketCommitments[JSON.stringify(params)] ?? {};
        },
        getPacketReceipt: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.PacketReceipt[JSON.stringify(params)] ?? {};
        },
        getPacketAcknowledgement: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.PacketAcknowledgement[JSON.stringify(params)] ?? {};
        },
        getPacketAcknowledgements: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.PacketAcknowledgements[JSON.stringify(params)] ?? {};
        },
        getUnreceivedPackets: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.UnreceivedPackets[JSON.stringify(params)] ?? {};
        },
        getUnreceivedAcks: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.UnreceivedAcks[JSON.stringify(params)] ?? {};
        },
        getNextSequenceReceive: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.NextSequenceReceive[JSON.stringify(params)] ?? {};
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
            console.log('Vuex module: ibc.core.channel.v1 initialized!');
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
        async QueryChannel({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryChannel(key.channel_id, key.port_id)).data;
                commit('QUERY', { query: 'Channel', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryChannel', payload: { options: { all }, params: { ...key }, query } });
                return getters['getChannel']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryChannel API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryChannels({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryChannels(query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.queryChannels({ ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'Channels', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryChannels', payload: { options: { all }, params: { ...key }, query } });
                return getters['getChannels']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryChannels API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryConnectionChannels({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryConnectionChannels(key.connection, query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.queryConnectionChannels(key.connection, { ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'ConnectionChannels', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryConnectionChannels', payload: { options: { all }, params: { ...key }, query } });
                return getters['getConnectionChannels']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryConnectionChannels API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryChannelClientState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryChannelClientState(key.channel_id, key.port_id)).data;
                commit('QUERY', { query: 'ChannelClientState', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryChannelClientState', payload: { options: { all }, params: { ...key }, query } });
                return getters['getChannelClientState']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryChannelClientState API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryChannelConsensusState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryChannelConsensusState(key.channel_id, key.port_id, key.revision_number, key.revision_height)).data;
                commit('QUERY', { query: 'ChannelConsensusState', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryChannelConsensusState', payload: { options: { all }, params: { ...key }, query } });
                return getters['getChannelConsensusState']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryChannelConsensusState API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryPacketCommitment({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryPacketCommitment(key.channel_id, key.port_id, key.sequence)).data;
                commit('QUERY', { query: 'PacketCommitment', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryPacketCommitment', payload: { options: { all }, params: { ...key }, query } });
                return getters['getPacketCommitment']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryPacketCommitment API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryPacketCommitments({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryPacketCommitments(key.channel_id, key.port_id, query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.queryPacketCommitments(key.channel_id, key.port_id, { ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'PacketCommitments', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryPacketCommitments', payload: { options: { all }, params: { ...key }, query } });
                return getters['getPacketCommitments']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryPacketCommitments API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryPacketReceipt({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryPacketReceipt(key.channel_id, key.port_id, key.sequence)).data;
                commit('QUERY', { query: 'PacketReceipt', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryPacketReceipt', payload: { options: { all }, params: { ...key }, query } });
                return getters['getPacketReceipt']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryPacketReceipt API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryPacketAcknowledgement({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryPacketAcknowledgement(key.channel_id, key.port_id, key.sequence)).data;
                commit('QUERY', { query: 'PacketAcknowledgement', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryPacketAcknowledgement', payload: { options: { all }, params: { ...key }, query } });
                return getters['getPacketAcknowledgement']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryPacketAcknowledgement API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryPacketAcknowledgements({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryPacketAcknowledgements(key.channel_id, key.port_id, query)).data;
                while (all && value.pagination && value.pagination.next_key != null) {
                    let next_values = (await queryClient.queryPacketAcknowledgements(key.channel_id, key.port_id, { ...query, 'pagination.key': value.pagination.next_key })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'PacketAcknowledgements', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryPacketAcknowledgements', payload: { options: { all }, params: { ...key }, query } });
                return getters['getPacketAcknowledgements']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryPacketAcknowledgements API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryUnreceivedPackets({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryUnreceivedPackets(key.channel_id, key.port_id, key.packet_commitment_sequences)).data;
                commit('QUERY', { query: 'UnreceivedPackets', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryUnreceivedPackets', payload: { options: { all }, params: { ...key }, query } });
                return getters['getUnreceivedPackets']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryUnreceivedPackets API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryUnreceivedAcks({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryUnreceivedAcks(key.channel_id, key.port_id, key.packet_ack_sequences)).data;
                commit('QUERY', { query: 'UnreceivedAcks', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryUnreceivedAcks', payload: { options: { all }, params: { ...key }, query } });
                return getters['getUnreceivedAcks']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryUnreceivedAcks API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryNextSequenceReceive({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryNextSequenceReceive(key.channel_id, key.port_id)).data;
                commit('QUERY', { query: 'NextSequenceReceive', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryNextSequenceReceive', payload: { options: { all }, params: { ...key }, query } });
                return getters['getNextSequenceReceive']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new Error('QueryClient:QueryNextSequenceReceive API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
    }
};
import { txClient, queryClient, MissingWalletError , registry} from './module'

import { Card } from "./module/types/cardchain/card"
import { CollectionProposal } from "./module/types/cardchain/collection_proposal"
import { CopyrightProposal } from "./module/types/cardchain/copyright_proposal"
import { WrapClearResponse } from "./module/types/cardchain/council"
import { WrapHashResponse } from "./module/types/cardchain/council"
import { Image } from "./module/types/cardchain/image"
import { MatchPlayer } from "./module/types/cardchain/match"
import { MatchReporterProposal } from "./module/types/cardchain/match_reporter_proposal"
import { Num } from "./module/types/cardchain/num"
import { Params } from "./module/types/cardchain/params"
import { IgnoreMatches } from "./module/types/cardchain/query"
import { IgnoreSellOffers } from "./module/types/cardchain/query"
import { QueryQServerResponse } from "./module/types/cardchain/query"
import { RunningAverage } from "./module/types/cardchain/running_average"
import { VoteRight } from "./module/types/cardchain/vote_right"
import { VotingResult } from "./module/types/cardchain/voting_result"
import { VotingResults } from "./module/types/cardchain/voting_results"


export { Card, CollectionProposal, CopyrightProposal, WrapClearResponse, WrapHashResponse, Image, MatchPlayer, MatchReporterProposal, Num, Params, IgnoreMatches, IgnoreSellOffers, QueryQServerResponse, RunningAverage, VoteRight, VotingResult, VotingResults };

async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
				Params: {},
				QCard: {},
				QCardContent: {},
				QUser: {},
				QCardchainInfo: {},
				QVotingResults: {},
				QVotableCards: {},
				QCards: {},
				QMatch: {},
				QCollection: {},
				QSellOffer: {},
				QCouncil: {},
				QMatches: {},
				QSellOffers: {},
				QServer: {},

				_Structure: {
						Card: getStructure(Card.fromPartial({})),
						CollectionProposal: getStructure(CollectionProposal.fromPartial({})),
						CopyrightProposal: getStructure(CopyrightProposal.fromPartial({})),
						WrapClearResponse: getStructure(WrapClearResponse.fromPartial({})),
						WrapHashResponse: getStructure(WrapHashResponse.fromPartial({})),
						Image: getStructure(Image.fromPartial({})),
						MatchPlayer: getStructure(MatchPlayer.fromPartial({})),
						MatchReporterProposal: getStructure(MatchReporterProposal.fromPartial({})),
						Num: getStructure(Num.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						IgnoreMatches: getStructure(IgnoreMatches.fromPartial({})),
						IgnoreSellOffers: getStructure(IgnoreSellOffers.fromPartial({})),
						QueryQServerResponse: getStructure(QueryQServerResponse.fromPartial({})),
						RunningAverage: getStructure(RunningAverage.fromPartial({})),
						VoteRight: getStructure(VoteRight.fromPartial({})),
						VotingResult: getStructure(VotingResult.fromPartial({})),
						VotingResults: getStructure(VotingResults.fromPartial({})),

		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getQCard: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QCard[JSON.stringify(params)] ?? {}
		},
				getQCardContent: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QCardContent[JSON.stringify(params)] ?? {}
		},
				getQUser: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QUser[JSON.stringify(params)] ?? {}
		},
				getQCardchainInfo: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QCardchainInfo[JSON.stringify(params)] ?? {}
		},
				getQVotingResults: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QVotingResults[JSON.stringify(params)] ?? {}
		},
				getQVotableCards: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QVotableCards[JSON.stringify(params)] ?? {}
		},
				getQCards: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QCards[JSON.stringify(params)] ?? {}
		},
				getQMatch: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QMatch[JSON.stringify(params)] ?? {}
		},
				getQCollection: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QCollection[JSON.stringify(params)] ?? {}
		},
				getQSellOffer: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QSellOffer[JSON.stringify(params)] ?? {}
		},
				getQCouncil: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QCouncil[JSON.stringify(params)] ?? {}
		},
				getQMatches: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QMatches[JSON.stringify(params)] ?? {}
		},
				getQSellOffers: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QSellOffers[JSON.stringify(params)] ?? {}
		},
				getQServer: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QServer[JSON.stringify(params)] ?? {}
		},

		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: DecentralCardGame.cardchain.cardchain initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},






		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryParams()).data


				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQCard({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQCard( key.cardId)).data


				commit('QUERY', { query: 'QCard', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQCard', payload: { options: { all }, params: {...key},query }})
				return getters['getQCard']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQCard API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQCardContent({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQCardContent( key.cardId)).data


				commit('QUERY', { query: 'QCardContent', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQCardContent', payload: { options: { all }, params: {...key},query }})
				return getters['getQCardContent']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQCardContent API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQUser({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQUser( key.address)).data


				commit('QUERY', { query: 'QUser', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQUser', payload: { options: { all }, params: {...key},query }})
				return getters['getQUser']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQUser API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQCardchainInfo({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQCardchainInfo()).data


				commit('QUERY', { query: 'QCardchainInfo', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQCardchainInfo', payload: { options: { all }, params: {...key},query }})
				return getters['getQCardchainInfo']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQCardchainInfo API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQVotingResults({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQVotingResults()).data


				commit('QUERY', { query: 'QVotingResults', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQVotingResults', payload: { options: { all }, params: {...key},query }})
				return getters['getQVotingResults']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQVotingResults API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQVotableCards({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQVotableCards( key.address)).data


				commit('QUERY', { query: 'QVotableCards', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQVotableCards', payload: { options: { all }, params: {...key},query }})
				return getters['getQVotableCards']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQVotableCards API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQCards({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQCards( key.status, query)).data


				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryQCards( key.status, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'QCards', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQCards', payload: { options: { all }, params: {...key},query }})
				return getters['getQCards']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQCards API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQMatch({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQMatch( key.matchId)).data


				commit('QUERY', { query: 'QMatch', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQMatch', payload: { options: { all }, params: {...key},query }})
				return getters['getQMatch']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQMatch API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQCollection({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQCollection( key.collectionId)).data


				commit('QUERY', { query: 'QCollection', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQCollection', payload: { options: { all }, params: {...key},query }})
				return getters['getQCollection']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQCollection API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQSellOffer({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQSellOffer( key.sellOfferId)).data


				commit('QUERY', { query: 'QSellOffer', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQSellOffer', payload: { options: { all }, params: {...key},query }})
				return getters['getQSellOffer']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQSellOffer API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQCouncil({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQCouncil( key.councilId)).data


				commit('QUERY', { query: 'QCouncil', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQCouncil', payload: { options: { all }, params: {...key},query }})
				return getters['getQCouncil']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQCouncil API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQMatches({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQMatches(query)).data


				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryQMatches({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'QMatches', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQMatches', payload: { options: { all }, params: {...key},query }})
				return getters['getQMatches']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQMatches API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQSellOffers({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQSellOffers( key.status, query)).data


				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryQSellOffers( key.status, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'QSellOffers', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQSellOffers', payload: { options: { all }, params: {...key},query }})
				return getters['getQSellOffers']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQSellOffers API Node Unavailable. Could not perform query: ' + e.message)

			}
		},







		async QueryQServer({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryQServer( key.id)).data


				commit('QUERY', { query: 'QServer', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQServer', payload: { options: { all }, params: {...key},query }})
				return getters['getQServer']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQServer API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async sendMsgApointMatchReporter({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgApointMatchReporter(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgApointMatchReporter:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgApointMatchReporter:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetProfileCard({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSetProfileCard(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetProfileCard:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetProfileCard:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateuser({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateuser(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateuser:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateuser:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRevealCouncilResponse({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRevealCouncilResponse(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRevealCouncilResponse:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRevealCouncilResponse:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgBuyCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBuyCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBuyCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgBuyCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddArtwork({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddArtwork(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddArtwork:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddArtwork:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgChangeArtist({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgChangeArtist(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgChangeArtist:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgChangeArtist:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveCardFromCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRemoveCardFromCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveCardFromCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveCardFromCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSaveCardContent({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSaveCardContent(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSaveCardContent:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSaveCardContent:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddArtworkToCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddArtworkToCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddArtworkToCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddArtworkToCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgFinalizeCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgFinalizeCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgFinalizeCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgFinalizeCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRewokeCouncilRegistration({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRewokeCouncilRegistration(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRewokeCouncilRegistration:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRewokeCouncilRegistration:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSubmitMatchReporterProposal({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSubmitMatchReporterProposal(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSubmitMatchReporterProposal:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSubmitMatchReporterProposal:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRestartCouncil({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRestartCouncil(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRestartCouncil:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRestartCouncil:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSubmitCopyrightProposal({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSubmitCopyrightProposal(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSubmitCopyrightProposal:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSubmitCopyrightProposal:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetCardRarity({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSetCardRarity(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetCardRarity:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetCardRarity:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveSellOffer({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRemoveSellOffer(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveSellOffer:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveSellOffer:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRegisterForCouncil({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRegisterForCouncil(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRegisterForCouncil:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRegisterForCouncil:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateCouncil({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateCouncil(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateCouncil:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateCouncil:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgReportMatch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgReportMatch(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgReportMatch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgReportMatch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgBuyCardScheme({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBuyCardScheme(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBuyCardScheme:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgBuyCardScheme:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgConfirmMatch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgConfirmMatch(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgConfirmMatch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgConfirmMatch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCommitCouncilResponse({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCommitCouncilResponse(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCommitCouncilResponse:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCommitCouncilResponse:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddContributorToCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddContributorToCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddContributorToCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddContributorToCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateSellOffer({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateSellOffer(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateSellOffer:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateSellOffer:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgBuyCard({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBuyCard(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBuyCard:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgBuyCard:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgVoteCard({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgVoteCard(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgVoteCard:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgVoteCard:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveContributorFromCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRemoveContributorFromCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveContributorFromCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveContributorFromCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddStoryToCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddStoryToCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddStoryToCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddStoryToCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSubmitCollectionProposal({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSubmitCollectionProposal(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSubmitCollectionProposal:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSubmitCollectionProposal:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDonateToCard({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgDonateToCard(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDonateToCard:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDonateToCard:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgTransferCard({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgTransferCard(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgTransferCard:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgTransferCard:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddCardToCollection({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddCardToCollection(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee,
	gas: "3000000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddCardToCollection:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddCardToCollection:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},

		async MsgApointMatchReporter({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgApointMatchReporter(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgApointMatchReporter:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgApointMatchReporter:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetProfileCard({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSetProfileCard(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetProfileCard:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetProfileCard:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateuser({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateuser(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateuser:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateuser:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRevealCouncilResponse({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRevealCouncilResponse(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRevealCouncilResponse:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRevealCouncilResponse:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgBuyCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBuyCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBuyCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgBuyCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddArtwork({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddArtwork(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddArtwork:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddArtwork:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgChangeArtist({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgChangeArtist(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgChangeArtist:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgChangeArtist:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveCardFromCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRemoveCardFromCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveCardFromCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveCardFromCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSaveCardContent({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSaveCardContent(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSaveCardContent:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSaveCardContent:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddArtworkToCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddArtworkToCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddArtworkToCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddArtworkToCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgFinalizeCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgFinalizeCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgFinalizeCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgFinalizeCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRewokeCouncilRegistration({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRewokeCouncilRegistration(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRewokeCouncilRegistration:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRewokeCouncilRegistration:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSubmitMatchReporterProposal({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSubmitMatchReporterProposal(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSubmitMatchReporterProposal:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSubmitMatchReporterProposal:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRestartCouncil({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRestartCouncil(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRestartCouncil:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRestartCouncil:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSubmitCopyrightProposal({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSubmitCopyrightProposal(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSubmitCopyrightProposal:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSubmitCopyrightProposal:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetCardRarity({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSetCardRarity(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetCardRarity:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetCardRarity:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveSellOffer({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRemoveSellOffer(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveSellOffer:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveSellOffer:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRegisterForCouncil({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRegisterForCouncil(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRegisterForCouncil:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRegisterForCouncil:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateCouncil({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateCouncil(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateCouncil:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateCouncil:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgReportMatch({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgReportMatch(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgReportMatch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgReportMatch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgBuyCardScheme({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBuyCardScheme(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBuyCardScheme:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgBuyCardScheme:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgConfirmMatch({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgConfirmMatch(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgConfirmMatch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgConfirmMatch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCommitCouncilResponse({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCommitCouncilResponse(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCommitCouncilResponse:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCommitCouncilResponse:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddContributorToCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddContributorToCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddContributorToCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddContributorToCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateSellOffer({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateSellOffer(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateSellOffer:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateSellOffer:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgBuyCard({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBuyCard(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBuyCard:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgBuyCard:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgVoteCard({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgVoteCard(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgVoteCard:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgVoteCard:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveContributorFromCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgRemoveContributorFromCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveContributorFromCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveContributorFromCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddStoryToCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddStoryToCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddStoryToCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddStoryToCollection:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSubmitCollectionProposal({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgSubmitCollectionProposal(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSubmitCollectionProposal:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSubmitCollectionProposal:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDonateToCard({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgDonateToCard(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDonateToCard:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDonateToCard:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgTransferCard({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgTransferCard(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgTransferCard:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgTransferCard:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddCardToCollection({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgAddCardToCollection(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddCardToCollection:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddCardToCollection:Create Could not create message: ' + e.message)
				}
			}
		},

	}
}

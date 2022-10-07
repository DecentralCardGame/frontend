import * as R from 'ramda'
import { entropyToMnemonic } from 'bip39'
import * as Random from 'randombytes'
import { signTx, createWalletFromMnemonic } from '@tendermint/sig/dist/web'
import { coin } from "@cosmjs/proto-signing";
// import { Coin } from "../store/generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/base/v1beta1/coin.js"
import { creditsFromCoins, emptyCard } from '../components/utils/utils.js'
import {GenericAuthorization} from "../store/generated/cosmos/cosmos-sdk/cosmos.authz.v1beta1/module/types/cosmos/authz/v1beta1/authz.js"
import {Any} from "../store/generated/cosmos/cosmos-sdk/cosmos.authz.v1beta1/module/types/google/protobuf/any.js"

export default {
  install (Vue, store) {
    Vue.mixin({
      methods: {
        newCardChain () {
          return new CardChain(this)
        }
      }
    })

    class CardChain {
      constructor(vue) {
        this.vue = Vue
        this.vue.$store = store
        this.bindVue = (that) => {
          this.vue = that
        }

        this.txQueue = {
          isRunning: false,
          queue: [],
          enqueue: function(transaction) {
              this.queue.push(transaction)

              if (!this.isRunning) {
                this.run()
              }
          },
          dispatch: function(route, msg) {
            return new Promise((resolve, reject) => {
                //this.enqueue(() => {
                  return store.dispatch(route, msg)
                    .then((res) => {
                      if (res.code != 0) {
                        reject(res.rawLog)
                      }
                      else
                        resolve(res)
                    })
                    .catch(reject)
                //})
              })
          },
          run: function() {
            this.isRunning = true

            if (!R.isEmpty(this.queue)) {
              const transaction = this.queue[0]
              this.queue = R.drop(1, this.queue)

              transaction().finally(() => this.run())
            } else {
              this.isRunning = false
            }
          }
        }
      }

      getAccInfo (address) {
        if (this.validAddress(address)) {
          return this.vue.$http.get(
            'cosmos/bank/v1beta1/balances/' + address,
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            .catch(this.handleGetError)
            .then(this.handleGetAcc(R.__, address))
        } else {
          this.vue.notifyFail('Do you even?', 'Have a proper address? Please login or register.')
          throw new Error('please provide proper address')
        }
      }
      updateUserCredits () {
        if (this.vue.$store.getters['common/wallet/address']) {
          return this.getAccInfo(this.vue.$store.getters['common/wallet/address'])
            .then((accData) => {
              let credits = creditsFromCoins(accData.coins)
              this.vue.$store.commit('setUserCredits', credits)
              return credits
            })
        }
      }
      useFaucet() {
        this.vue.notifyInfo('Faucet', 'Get Credits from Faucet')
        return new Promise((resolve, reject) => {
            this.txQueue.enqueue(() => {
              return this.vue.$http.post(
                process.env.VUE_APP_FAUCET,
                {
                  address: this.vue.$store.getters['common/wallet/address'],
                  coins: ['0ubpf', '5000ucredits'],
                },
                {
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
              )
              .then((res) => {
                resolve(res)
              })
              .catch(reject)
            })
          })

      }
      cardObjectToWebModel (rawCard) {
        if (rawCard.content) {
          let contentLens = R.lensProp('Content')
          let parseContent = item => R.set(contentLens, JSON.parse(item.content), item)
          let card = R.merge(emptyCard, parseContent(rawCard))
          let cardType = R.keys(card.Content)
          card = R.merge(card, card.Content[cardType[0]])

          card.nerflevel = parseInt(card.nerflevel)
          card.type = cardType[0]

          card.RulesTexts = card.RulesTexts ? card.RulesTexts : []
          card.Keywords = card.Keywords ? R.map(JSON.parse, card.Keywords) : []

          if (rawCard.fullArt && !R.isNil(rawCard.fullArt))
            card.fullArt = JSON.parse(rawCard.fullArt)

          console.log('parsed card: ', card)
          return card
        } else {
          return emptyCard
        }
      }
      cardWebModelToCardobject (webModel, cardImageUrl) {
        console.log('trying to parse ', webModel)
        let cardContent = {
          CardName: webModel.CardName,
          Tags: R.reject(R.isNil, webModel.Tags),
          FlavourText: webModel.FlavourText,
          Class: {
            Nature: webModel.Class.Nature == true,
            Technology: webModel.Class.Technology == true,
            Culture: webModel.Class.Culture == true,
            Mysticism: webModel.Class.Mysticism == true,
          },
          Keywords: R.map(JSON.stringify, webModel.Keywords),
          RulesTexts: webModel.RulesTexts
        }
        // in the following part we check things that are only required for specific card types
        if (webModel.type !== "Headquarter") {
          cardContent.CastingCost = webModel.CastingCost
          console.log("additionalcost empty?", R.isEmpty(webModel.AdditionalCost))
          if (!R.isEmpty(webModel.AdditionalCost)) {
            cardContent.AdditionalCost = webModel.AdditionalCost
          }
        }
        if (webModel.type !== "Action") {
          cardContent.Health = webModel.Health
          cardContent.Abilities = webModel.Abilities
        }
        if (webModel.type === "Entity") {
          cardContent.Attack = webModel.Attack
        }
        else if (webModel.type === "Action") {
          cardContent.Effects = webModel.Effects
        }
        else if (webModel.type === "Headquarter") {
          cardContent.Delay = webModel.Delay
        }
        let cardobject = {
          content: {
            [webModel.type]: cardContent
          },
          image: cardImageUrl ? cardImageUrl : "if you read this, someone was able to upload a card without proper image...",
          fullArt: webModel.fullArt,
          notes: webModel.notes,
        }
        console.log('parsed into:', cardobject)
        return cardobject
      }
      saveContentToUnusedCardSchemeTx (card) {
        return this.getUserInfo(this.vue.$store.getters['common/wallet/address'])
          .then(user => {
            if (R.isEmpty(user.ownedCardSchemes)) {
              this.vue.notifyFail('YOU MUST CONSTRUCT ADDITIONAL PYLONS', 'You don\'t own any Card Frames. Please buy one before publishing.')
              throw new Error('account ' + this.vue.$store.getters['common/wallet/address'] + ' does not own Card Frames')
            } else {
              let id = user.ownedCardSchemes[0]

              return Promise.all([
                this.saveContentToCardTx(card, id),
                this.saveArtworkToCard(id, card.image, card.fullArt)
              ])
            }
          })
      }
      sendGenericTx (type, data) {
        let prettyMsg = type.split(".Msg")[1]
        let msg = {
          value: R.merge({
            "@type": "/"+type,
            "creator": this.vue.$store.getters['common/wallet/address'],
          }, data)
        }
        console.log(msg)
        this.vue.notifyInfo('Sending', 'Sending request "'+prettyMsg+'" to the blockchain.')
        return this.txQueue.dispatch(type.replace(".Msg", "/sendMsg"), msg)
          .then(res => {
            this.vue.notifySuccess('EPIC WIN', prettyMsg+' was successful.')
            return res
          })
          .catch(err => {
            this.vue.notifyFail('Fail', err.message)
            console.log(err)
            throw new Error(err)
          })
      }
      queryCouncil (id) {
        return this.vue.$http.get('/DecentralCardGame/cardchain/cardchain/q_council/' + id)
      }
      registerForCouncilTx () {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgRegisterForCouncil", {})
      }
      deRegisterFromCouncilTx () {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgRewokeCouncilRegistration", {})
      }
      createCouncilTx (id) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgCreateCouncil", {
          "cardId": id
        })
      }
      commitCouncilResponse (id, response, secret, suggestion) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain/sendMsgCommitCouncilResponse", {
          "councilId": id,
          "response": response,
          "secret": secret,
          "suggestion": suggestion
        })
      }
      restartCouncil (id) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain/sendMsgRestartCouncil", {
          "councilId": id
        })
      }
      revealCouncilResponse (id, response, secret) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain/sendMsgRevealCouncilResponse", {
          "councilId": id,
          "response": response,
          "secret": secret,
        })
      }
      setProfileCard (id) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgSetProfileCard", {
          "cardId": id
        })
      }
      saveArtworkToCard (id, image, fullart) {
        // this delay fixes the sequence conflict when firing a save card content at the same time
        return new Promise(resolve => setTimeout(resolve, 20)).then(() => {
          return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgAddArtwork", {
            "cardId": id, 
            "image": btoa(image), 
            "fullArt": fullart
          })
        })
      }
      transferCard (id, receiver) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgTransferCard", {
          "cardId": id, 
          "receiver": receiver
        })
      }
      voteCardTx (cardId, voteType) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgVoteCard", {
          "cardId": cardId, "voteType": voteType
        })
      }
      saveContentToCardTx (card, id) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgSaveCardContent", {
          "cardId": id,
          "content": btoa(JSON.stringify(card.content)),
          "notes": card.notes,
          "artist": this.vue.$store.getters['common/wallet/address']
        })
      }
      buyCardSchemeTx (maxBid) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgBuyCardScheme", {
          "bid": maxBid+"ucredits"
        })
      }
      registerAccTx (alias) {
        return this.sendGenericTx("DecentralCardGame.cardchain.cardchain.MsgCreateuser", {
          newUser: this.vue.$store.getters['common/wallet/address'],
          alias: alias
        })
      }
      transferCoin (to, coins) {
        return this.sendGenericTx("cosmos.bank.v1beta1.MsgSend", {
          "to_address": to, 
          "amount": coins, 
          "from_address": this.vue.$store.getters['common/wallet/address']})
      }
      grantAuthz (addr, msg) {
        let date = new Date()
        date.setMonth(date.getMonth() + 1);
        return this.sendGenericTx(
          "cosmos.authz.v1beta1.MsgGrant",
          {
            "grantee": addr,
            "grant": {
              "authorization":{
                "type_url": "/cosmos.authz.v1beta1.GenericAuthorization",
                value: GenericAuthorization.encode(GenericAuthorization.fromPartial({
                  msg: msg
                })).finish()
              },
              "expiration": date
            },
            "granter": this.vue.$store.getters['common/wallet/address']
          }
        )
      }
      revokeAuthz (grantee, msg) {
        return this.sendGenericTx("cosmos.authz.v1beta1.MsgRevoke", {
          "grantee": grantee, 
          "msg_type_url": msg, 
          "granter": this.vue.$store.getters['common/wallet/address']})
      }
      getUserInfo (address) {
          console.log(this.validAddress(address))
          if (this.validAddress(address)) {
            return this.vue.$http.get('/DecentralCardGame/cardchain/cardchain/q_user/' + address)
              .catch(this.handleGetError)
              .then(this.handleGetUser(R.__, address))
          } else {
            this.vue.notifyFail('Do you even?', 'Have a proper address? Please login or register.')
            throw new Error('please provide proper address')
          }
      }
      getGrants (addr) {
          return this.vue.$http.get('/cosmos/authz/v1beta1/grants?granter='+this.vue.$store.getters['common/wallet/address']+"&grantee=" + addr)
              .catch(this.handleGetError)
              .then(this.handleGetGrants(R.__, addr))
      }
      getCard (id) {
          return this.vue.$http.get('/DecentralCardGame/cardchain/cardchain/q_card/' + id)
              .catch(this.handleGetError)
              .then(this.handleGetCard(R.__, id))
      }
      getCardList (owner, status, cardType, classes, sortBy, nameContains, keywordsContains, notesContains) {
          status = status.toLowerCase()
          if (status != 'scheme' && status != 'prototype' && status != 'counciled' && status != 'trial' && status != 'permanent' && status != '' && status != 'playable' && status != 'unplayable') {
            this.vue.notifyFail('INVALID STATUS', 'The requested card status is not valid.')
            throw new Error('CardList status invalid: ' + status)
          }
          return this.vue.$http.get('DecentralCardGame/cardchain/cardchain/q_cards/' +
              (status ? status+'?' : 'none?') +
              (owner ? "&owner="+owner : "") +
              (cardType ? "&cardType="+cardType : "") +
              (classes ? "&classes="+classes : "") +
              (sortBy ? "&sortBy="+sortBy : "") +
              (nameContains? "&nameContains="+nameContains : "") +
              (keywordsContains? "&keywordsContains="+keywordsContains : "") +
              (notesContains? "&notesContains="+notesContains : "")
            )
            .catch(this.handleGetError)
            .then(this.handleGetCardList(R.__, status))
      }
      getVotableCards (address) {
          if (this.validAddress(address)) {
          return this.vue.$http.get('/DecentralCardGame/cardchain/cardchain/q_votable_cards/' + address)
              .catch(this.handleGetError)
              .then(this.handleGetVotableCards(R.__, address))
          } else {
            return new Error('Address is invalid, please register your address in the blockchain. You can do this by clicking JOIN.')
          }
      }
      getVotingResults () {
        return this.vue.$http.get('/DecentralCardGame/cardchain/cardchain/q_voting_results')
          .then(res => {
            return res.data
          })
          .catch(this.handleGetError)
      }
      getParams () {
        return this.vue.$http.get('/DecentralCardGame/cardchain/cardchain/params')
          .then(res => {
            return res.data
          })
          .catch(this.handleGetError)
      }
      getGameInfo () {
          return this.vue.$http.get('DecentralCardGame/cardchain/cardchain/q_cardchain_info')
          .then(res => {
            console.log("game info", res)
            return res.data
          })
          .catch(this.handleGetError)
      }

      handleGetUser = R.curry((res, address) => {
        console.log("handlegetuser", res)
        if (!res || !res.data) {
          this.vue.notifyFail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
          throw new Error('account ' + address + ' is not registered')
        } else {
          return res.data
        }
      })
      handleGetGrants = R.curry((res, address) => {
        console.log("handlegetgrants", res)
        return res.data
      })
      handleGetAcc = R.curry((res, address) => {
        if (!res) {
          this.vue.notifyFail('Account not registered', address + ' is not registered on the blockchain.')
          throw new Error(address + ' is not registered on the blockchain.')
        } else {
          return {
            coins: res.data.balances
          }
        }
      })
      handleGetCard = R.curry((res, cardId) => {
        if (res.data.owner === '') {
          // this.vue.notifyFail('Card without Owner', 'If you can read this the programmers dun goofed.')
          throw new Error('Card without Owner: ' + cardId)
        }
        if (!res.data) {
          this.vue.notifyFail('WTF', 'A card was looked up that does not exist in the blockchain.')
          throw new Error('Card with ' + cardId + ' does not exist.')
        } else {
          // console.log(res.data)
          return res.data
        }
      })
      handleGetCardList = R.curry((res, type) => {
        console.log(res.data)
        if (res.data === '') {
          this.vue.notifyFail('Sad', 'Basically the CardList is valid, but it is empty.')
          throw new Error('CardList Empty: ' + res)
        }
        if (!res.data) {
          this.vue.notifyInfo('Empty', 'An empty cardList was returned by the blockchain.')
          throw new Error('CardList with type ' + type + ' did not return a proper result: ' + res)
        } else {
          return res.data
        }
      })
      handleGetVotableCards = R.curry((res, address) => {
        console.log("votable res", res)
        if (res.data === null) {
          this.vue.notifyFail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
          return {
            unregistered: true
          }
        } else {
          if (res.data.unregistered == true) {
            return res.data
          }
          else if (res.data.noVoteRights == true) {
            return res.data
          }
          return {
            votables: res.data
          }
        }
      })
      handleGetError = (err) => {
        console.log("handleGetError res", err.response)
        if (err.response) {
          this.vue.notifyFail('Code' + err.response.data.code, err.response.data.message)
          //throw new Error(err)
        } else {
          this.vue.notifyFail('NO CONNECTION', 'No connection to the blockchain. Please freak out responsibly.')
          throw new Error(err)
        }
      }
      handlePutError = (err) => {
        if (err.response.data) {
          this.vue.notifyFail('OH SHIT', err.response.data.error)
          console.error(err.response.data)
          throw new Error('handled')
        } else {
          this.vue.notifyFail('NO CONNECTION', 'No connection to the blockchain. Please freak out responsibly.')
          throw new Error(err)
        }
      }
      validAddress (address) {
        if (address) {
          return address.startsWith('cc') && address.length === 41
        } else {
          return false
        }
      }
      b64DecodeUnicode (str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
      }
    }

    Vue.config.globalProperties.$cardChain = new CardChain(Vue)
  }
}

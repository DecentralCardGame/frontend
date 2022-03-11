import * as R from 'ramda'
import { entropyToMnemonic } from 'bip39'
import * as Random from 'randombytes'
import { signTx, createWalletFromMnemonic } from '@tendermint/sig/dist/web'


import { creditsFromCoins, emptyCard } from '../components/utils/utils.js'

export default {
  install (Vue, store, that) {
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
        this.notifyFail = Vue.$notify
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
          return this.vue.$http.get('auth/accounts/' + address)
            .catch(this.handleGetError)
            .then(this.handleGetAcc(R.__, address))
        } else {
          this.vue.notifyFail('Do you even?', 'Have a proper address? Please login or register.')
          throw new Error('please provide proper address')    
        }
      }
      updateUserCredits () {
        if (this.vue.$store.getters['getUserAddress']) {
          this.getAccInfo(this.vue.$store.getters['getUserAddress'])
          .then(acc => {
            this.vue.$store.commit('setUserCredits', creditsFromCoins(acc.coins))
          })
        }
      }
      cardObjectToWebModel (rawCard) {
        if (rawCard.Content) {
          let contentLens = R.lensProp('Content')
          let parseContent = item => R.set(contentLens, JSON.parse(item.Content), item)
          let card = R.merge(emptyCard, parseContent(rawCard))
          let cardType = R.keys(card.Content)
          card = R.merge(card, card.Content[cardType[0]])

          card.image = card.Image
          card.nerflevel = parseInt(card.Nerflevel)
          card.type = cardType[0]

          card.RulesTexts = card.RulesTexts ? card.RulesTexts : []
          card.Keywords = card.Keywords ? R.map(JSON.parse, card.Keywords) : []

          if (rawCard.FullArt && !R.isNil(rawCard.FullArt)) 
            card.FullArt = JSON.parse(rawCard.FullArt)

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
          FullArt: webModel.FullArt,
          Notes: webModel.Notes,
        }
        console.log('parsed into:', cardobject)
        return cardobject
      }
      generateMnemonic () {
        let entropySize = 24 * 11 - 8
        let entropy = Random(entropySize / 8)
        return entropyToMnemonic(entropy)
      }
      registerAccTx (alias) {
        return new Promise((resolve, reject) => {
          // this tx is special because it is not signed by the user but by a special creator address
          let reqBody = {
            'base_req': {
              'from': process.env.VUE_APP_CREATOR_ADDRESS,
              'chain_id': process.env.VUE_APP_CHAIN_ID,
              'gas': 'auto',
              'gas_adjustment': '1.5'
            },
            'new_user': this.vue.$store.getters['getUserAddress'],
            'creator': process.env.VUE_APP_CREATOR_ADDRESS,
            'alias': alias
          }
          this.txQueue.enqueue(() => {
            return Promise.all([this.getAccInfo(process.env.VUE_APP_CREATOR_ADDRESS), this.vue.$http.put('cardservice/create_user', reqBody)])
              .then(res => this.signAndBroadcast(process.env.VUE_APP_CREATOR_MNEMONIC, res))
              .then(() => {
                resolve(this.getAccInfo(this.vue.$store.getters['getUserAddress']))
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      }
      buyCardSchemeTx (maxBid) {
          return new Promise((resolve, reject) => {
            let reqBody = {
              'base_req': {
                'from': this.vue.$store.getters['getUserAddress'],
                'chain_id': process.env.VUE_APP_CHAIN_ID,
                'gas': 'auto',
                'gas_adjustment': '1.5'
              },
              'amount': maxBid + 'credits',
              'buyer': this.vue.$store.getters['getUserAddress']
            }
            this.txQueue.enqueue(() => {
              return Promise.all([this.getAccInfo(this.vue.$store.getters['getUserAddress']), this.vue.$http.post('cardservice/buy_card_scheme', reqBody)])
                .then(res => this.signAndBroadcast(this.vue.$store.getters['getUserMnemonic'], res))
                .then(() => { 
                  this.vue.notifySuccess('EPIC WIN', 'You have successfully bought a Card Frame.') 
                  resolve(this.getAccInfo(this.vue.$store.getters['getUserAddress']))
                })
                .catch(err => {
                  console.error(err)
                  if (err.response.data.error) {
                    var errData = JSON.parse(err.response.data.error)
                    if (errData.length > 0) {
                      var errLog = JSON.parse(errData[0].log)
                      this.vue.notifyFail('IGNORE FEMALE, ACQUIRE CURRENCY', errLog.message)
                    } else {
                      console.error(errData)
                      this.vue.notifyFail('WHILE YOU WERE OUT', 'shit got serious.')
                    }
                  } else {
                    console.error(err)
                    this.vue.notifyFail('WHILE YOU WERE OUT', 'shit got serious.')
                  }
                  reject(err)
                })
            })
          })
      }
      saveContentToUnusedCardSchemeTx (card) {
        return new Promise((resolve, reject) => {
          this.getUserInfo(this.vue.$store.getters['getUserAddress'])
          .then(user => {
            if (!user.ownedCardSchemes) {
              this.vue.notifyFail('YOU MUST CONSTRUCT ADDITIONAL PYLONS', 'You don\'t own any Card Frames. Please buy one before publishing.')
              throw new Error('account ' + this.vue.$store.getters['getUserAddress'] + ' does not own Card Frames')
            } else {
              let reqBody = {
                'base_req': {
                  'from': this.vue.$store.getters['getUserAddress'],
                  'chain_id': process.env.VUE_APP_CHAIN_ID,
                  'gas': 'auto',
                  'gas_adjustment': '10'
                },
                'owner': this.vue.$store.getters['getUserAddress'],
                'content': JSON.stringify(card.content),
                'image': card.image,
                'cardid': user.ownedCardSchemes[0],
                'notes': card.Notes,
                'fullart': JSON.stringify(card.FullArt)
              }
              return reqBody
            }
          })
          .then(req => {
            this.txQueue.enqueue(() => {
              return Promise.all([this.getAccInfo(this.vue.$store.getters['getUserAddress']), this.saveCardContentGenerateTx(req)])
                .then(res => this.signAndBroadcast(this.vue.$store.getters['getUserMnemonic'], res))
                .then(() => {
                  this.vue.notifySuccess('EPIC WIN', 'You have successfully published this card.')
                  resolve(this.getAccInfo(this.vue.$store.getters['getUserAddress']))
                })
                .catch(this.handleTxFail(reject))
            })
          })
        })
      }
      saveContentToCardWithIdTx (card) {
        return new Promise((resolve, reject) => {
          let req = {
            'base_req': {
              'from': this.vue.$store.getters['getUserAddress'],
              'chain_id': process.env.VUE_APP_CHAIN_ID,
              'gas': 'auto',
              'gas_adjustment': '10'
            },
            'owner': this.vue.$store.getters['getUserAddress'],
            'content': JSON.stringify(card.content),
            'image': card.image,
            'cardid': card.id,
            'notes': card.Notes,
            'fullart': JSON.stringify(card.FullArt)
          }
          this.txQueue.enqueue(() => {
            return Promise.all([this.getAccInfo(this.vue.$store.getters['getUserAddress']), this.saveCardContentGenerateTx(req)])
              .then(res => this.signAndBroadcast(this.vue.$store.getters['getUserMnemonic'], res))
              .then(() => {
                this.vue.notifySuccess('EPIC WIN', 'You have successfully edited this card.')
                resolve(this.getAccInfo(this.vue.$store.getters['getUserAddress']))
              })
              .catch(this.handleTxFail(reject))
          })
        })
      }
      voteCardTx (cardid, voteType) {
        return new Promise((resolve, reject) => {
          let req = {
            'base_req': {
              'from': this.vue.$store.getters['getUserAddress'],
              'chain_id': process.env.VUE_APP_CHAIN_ID,
              'gas': 'auto',
              'gas_adjustment': '1.5'
            },
            'voter': this.vue.$store.getters['getUserAddress'],
            'votetype': voteType,
            'cardid': '' + cardid
          }
      
          this.txQueue.enqueue(() => {
            return Promise.all([this.getAccInfo(this.vue.$store.getters['getUserAddress']), this.voteCardGenerateTx(req)])
              .then(res => this.signAndBroadcast(this.vue.$store.getters['getUserMnemonic'], res))
                .then(() => {
                  this.vue.notifySuccess('VOTED', 'Vote Transaction successful!')
                  resolve(this.getAccInfo(this.vue.$store.getters['getUserAddress']))
                })
                .catch(this.handleTxFail(reject))
          })
        })
      }
      getUserInfo (address) {
          if (this.validAddress(address)) {
            return this.vue.$http.get('cardservice/user/' + address)
              .catch(this.handleGetError)
              .then(this.handleGetUser(R.__, address))
          } else {
            this.vue.notifyFail('Do you even?', 'Have a proper address? Please login or register.')
            throw new Error('please provide proper address')
          }
      }
      getCard (id) {
          return this.vue.$http.get('cardservice/cards/' + id)
              .catch(this.handleGetError)
              .then(this.handleGetCard(R.__, id))
      }
      getCardList (owner, status, cardType, classes, sortBy, nameContains, keywordsContains, notesContains) {
          if (status != 'scheme' && status != 'prototype' && status != 'counciled' && status != 'trial' && status != 'permanent' && status != '') {
            this.vue.notifyFail('INVALID STATUS', 'The requested card status is not valid.')
            throw new Error('CardList status invalid: ' + status)
          }
          return this.vue.$http.get('DecentralCardGame/cardchain/cardchain/q_cards/' +
              (owner? owner+'/' : '%22%22/') +
              (status ? status+'/' : 'none/') +
              (cardType? cardType+'/' : '%22%22/') + 
              (classes? classes+'/' : '%22%22/') + 
              (sortBy? sortBy+'/' : '%22%22/') + 
              (nameContains? nameContains+'/' : '%22%22/') +
              (keywordsContains? keywordsContains+'/' : '%22%22/') +
              (notesContains? notesContains+'/' : '%22%22')
            )
            .catch(this.handleGetError)
            .then(this.handleGetCardList(R.__, status))
      }
      getVotableCards (address) {
          if (this.validAddress(address)) {
          return this.vue.$http.get('cardservice/votable_cards/' + address)
              .catch(this.handleGetError)
              .then(this.handleGetVotableCards(R.__, address))
          } else {
          return Promise.reject(new Error('Address is invalid, please register your address in the blockchain. You can do this by clicking JOIN.'))
          }
      }
      getVotingResults () {
        return this.vue.$http.get('cardservice/cardchain_votingresults')
          .then(res => {
            return {
            votingResult: res.data.result
            }
          })
          .catch(this.handleGetError)
      }
      getGameInfo () {
          return this.vue.$http.get('cardservice/cardchain_info')
          .then(res => {
              return {
              cardSchemePrice: res.data.result
              }
          })
          .catch(this.handleGetError)
      }
    
      // From here on are functions which can be made private, since they don't need to be exposed
      
      broadcast (signedTx) {
        this.vue.notifyInfo('BROADCASTING', 'Transaction successfully created, sending it now into the blockchain.')
        return this.vue.$http.post('txs', {
          'tx': signedTx.value,
          'mode': 'block'
        }).catch(err => {
          if (err.response) {
            console.error(err.response.data)
            this.vue.notifyFail('INVALID TX', err.response.data)
          } else {
            console.error(err)
          }
          this.vue.notifyFail('WTF', err)
          throw err
        }).then(res => {
          if (res.data.code) {
            this.vue.notifyFail('EPIC FAIL', res.data.raw_log)
            throw new Error(res.data.raw_log)
          }
          this.getTx(res.data.txhash)
            .then(tx => { console.log('looked up tx:', tx) })
          return res
        })
      }
      sign (rawTx, accData, wallet) {
        const signMeta = {
          account_number: accData.account_number.toString(),
          chain_id: process.env.VUE_APP_CHAIN_ID,
          sequence: accData.sequence.toString()
        }
        let unsignedTx = {
          msg: rawTx.value.msg,
          fee: rawTx.value.fee,
          memo: rawTx.value.memo
        }
        let signed = signTx(unsignedTx, signMeta, wallet)
        
        return {
          type: 'cosmos-sdk/StdTx',
          value: signed
        }
      }
      signAndBroadcast (mnemonic, accInfoAndRawTx) {
        let accData = accInfoAndRawTx[0]
        let rawTx = accInfoAndRawTx[1].data
        let wallet = createWalletFromMnemonic(mnemonic)
        let signedTx = this.sign(rawTx, accData, wallet)
        return this.broadcast(signedTx)
      }
      getTx (hash) {
        return this.vue.$http.get('txs/' + hash)
          .catch(this.handleGetError)
      }
      voteCardGenerateTx (reqBody) {
        return this.vue.$http.put('cardservice/vote_card', reqBody)
          .catch(this.handlePutError)
      }
      saveCardContentGenerateTx (reqBody) {
        return this.vue.$http.put('cardservice/save_card_content', reqBody)
          .catch(this.handlePutError)
      }
      handleGetUser = R.curry((res, address) => {
        if (res.data.result.Alias === '') {
          this.vue.notifyFail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
          throw new Error('account ' + address + ' is not registered')
        } else {
          return {
            alias: res.data.result.Alias,
            ownedCardSchemes: res.data.result.OwnedCardSchemes,
            ownedCards: res.data.result.OwnedCards,
            voteRights: res.data.result.VoteRights
          }
        }
      })
      handleGetAcc = R.curry((res, address) => {
        if (res.data.result.value.address === '') {
          this.vue.notifyFail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
          throw new Error('account ' + address + ' is not registered')
        } else {
          return {
            coins: res.data.result.value.coins,
            account_number: res.data.result.value.account_number,
            sequence: res.data.result.value.sequence
          }
        }
      })
      handleGetCard = R.curry((res, cardId) => {
        if (res.data.result.owner === '') {
          this.vue.notifyFail('Card without Owner', 'If you can read this the programmers dun goofed.')
          throw new Error('Card without Owner: ' + cardId)
        }
        if (!res.data.result) {
          this.vue.notifyFail('WTF', 'A card was looked up that does not exist in the blockchain.')
          throw new Error('Card with ' + cardId + ' does not exist.')
        } else {
          return {
            card: res.data.result
          }
        }
      })
      handleGetCardList = R.curry((res, type) => {
        console.log(res)
        if (res.data.result === '') {
          this.vue.notifyFail('Sad', 'Basically the CardList is valid, but it is empty.')
          throw new Error('CardList Empty: ' + res)
        }
        if (!res.data.result) {
          this.vue.notifyInfo('Empty', 'An empty cardList was returned by the blockchain.')
          throw new Error('CardList with type ' + type + ' did not return a proper result: ' + res)
        } else {
          return {
            cardList: res.data.result
          }
        }
      })
      handleGetVotableCards = R.curry((res, address) => {
        // TODO check if it is possible to differentiate here between unregistered and no voting rights
        if (res.data.result === null) {
          this.vue.notifyFail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
          return {
            unregistered: true
          }
        } else {
          if (res.data.result.unregistered == true) {
            return res.data.result
          }
          else if (res.data.result.noVoteRights == true) {
            return res.data.result
          }
          return {
            votables: res.data.result
          }
        }
      })
      handleGetError = (res) => {
        if (res.data) {
          this.vue.notifyFail('OH SHIT', 'Something went terribly wrong.')
          throw new Error(res.data)
        } else {
          this.vue.notifyFail('NO CONNECTION', 'No connection to the blockchain. Please freak out responsibly.')
          throw new Error(res)
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
      handleTxFail = R.curry((reject, err) => {
        console.log(err)
        if (err.message === 'handled') {
          reject(err)
        }
        else if(err.message) {
          this.vue.notifyFail('FAIL HARD', err.message)
          console.error(err)
          reject(err.message)
        }
        else {
          console.error(err)
          reject(err)
        }
      })
      validAddress (address) {
        if (address) {
          return address.startsWith('cosmos')
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

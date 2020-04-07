import { entropyToMnemonic } from 'bip39'
import * as Random from  'randombytes'
import { signTx, createWalletFromMnemonic } from '@tendermint/sig';

import * as R from 'ramda'

import { notify } from './utils.js'


export function parseCard (rawCard) {
  console.log('parsing card: ', rawCard)
  if (rawCard.Content) {
    let contentLens = R.lensProp('Content')
    let parseContent = item => R.set(contentLens, JSON.parse(b64DecodeUnicode(item.Content)), item)
    let card = parseContent(rawCard)
    let cardType = R.keys(card.Content)
    card = R.merge(card, card.Content[cardType[0]])

    return {
      'name': card.Name,
      'type': cardType[0],
      'health': card.Health || 0,
      'attack': card.Attack || 0,
      'speed': card.CastSpeed,
      'cost': card.Cost,
      'abilities': card.Abilities,
      'effects': card.Effects,
      'tag': card.Tags,
      'text': card.Text,
      'image': card.Content.image,
      'nerflevel': parseInt(card.Nerflevel)
    }
  } else {
    return {
      'name': 'empty',
      'type': null,
      'health': 0,
      'attack': 0,
      'speed': 0,
      'cost': {},
      'abilities': null,
      'effects': null,
      'tag': null,
      'text': '',
      'image': null,
      'nerflevel': 0
    }
  }
}

export function generateMnemonic() {
  let entropySize = 24 * 11 - 8;
  let entropy = Random(entropySize / 8);
  return entropyToMnemonic(entropy);
}

function sign(rawTx, accData, wallet) {
  console.log('rawtx: ', rawTx)
  console.log('accData', accData)

  const signMeta = {
    account_number: accData.account_number.toString(),
    chain_id:       process.env.VUE_APP_CHAIN_ID,
    sequence:       accData.sequence.toString()
  };

  let unsignedTx = {
    msg: rawTx.value.msg,
    fee: rawTx.value.fee,
    memo: rawTx.value.memo
  }

  console.log('unsigned tx:', unsignedTx)
  console.log(signMeta)
  console.log(localStorage.wallet.address)
  console.log(localStorage.address)

  let signed = signTx(unsignedTx, signMeta, wallet)

  console.log('signed tx: ', signed)

  return {
    type:"cosmos-sdk/StdTx",
    value: signed
  };
}

export function registerAcc (http, alias) {

  let reqBody = {
    'base_req': {
      'from': process.env.VUE_APP_CREATOR_ADDRESS,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '1.5'
    },
    'new_user': localStorage.address,
    'creator': process.env.VUE_APP_CREATOR_ADDRESS,
    'alias': alias
  }

  return Promise.all([getAccInfo(http, process.env.VUE_APP_CREATOR_ADDRESS), http.put('cardservice/create_user', reqBody)])
  .then(responses => {
    let accData = responses[0]
    let rawTx = responses[1].data

    let wallet = createWalletFromMnemonic(process.env.VUE_APP_CREATOR_MNEMONIC)

    console.log('accDatayes:', responses)
    let signedTx = sign(rawTx, accData, wallet)

    return broadcast(http, signedTx)
      .then(console.log)
      .then(_ => notify.success('EPIC WIN', 'You have successfully registered in the blockchain.'))
      .catch(() => {
        this.$notify({
          group: 'fail',
          title: 'Registration failed!'
        })
    })
  })
}

export function buyCardSchemeTx (http, address, mnemonic, maxBid) {
  let reqBody = {
    'base_req': {
      'from': localStorage.address,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '1.5'
    },
    'amount': maxBid + 'credits',
    'buyer': localStorage.address
  }

  return Promise.all([getAccInfo(http, address), http.post('cardservice/buy_card_scheme', reqBody)])
    .then(responses => {
      let accData = responses[0]
      let rawTx = responses[1].data

      let wallet = createWalletFromMnemonic(localStorage.mnemonic)
  
      let signedTx = sign(rawTx, accData, wallet)

      return broadcast(http, signedTx)
    })
}

export function saveContentToUnusedCardSchemeTx (http, address, mnemonic, cardContent, onSuccessCallback) {
  return getUserInfo(http, address)
    .then(user => {
      console.log('user:',user)

      if (!user.ownedCardSchemes) {
        notify.fail('YOU MUST CONSTRUCT ADDITIONAL PYLONS', 'You don\'t own any card schemes. Please buy one before publishing.')
        throw new Error('account ' + address + ' does not own card schemes')
      } else {
        let reqBody = {
          'base_req': {
            'from': localStorage.address,
            'chain_id': 'testCardchain',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'owner': localStorage.address,
          'content': JSON.stringify(cardContent),
          'cardid': user.ownedCardSchemes[0]
        }
        return reqBody
      }
    })
    .then(req => {
      txLoop.enqueue(_ => {
        return Promise.all([getAccInfo(http, address), saveCardContentGenerateTx(http, req)])
          .then(responses => {
            let accData = responses[0]
            let rawTx = responses[1].data
        
            let wallet = createWalletFromMnemonic(localStorage.mnemonic)
  
            let signedTx = sign(rawTx, accData, wallet)

            return broadcast(http, signedTx)
              .then(res => {
                console.log('broadcast response:', res)
                notify.success('EPIC WIN', 'You have successfully published this card.')
                onSuccessCallback()
              })
              .catch(err => {
                notify.fail('FAIL HARD', err.message)
                console.error(err)
              })
          })
      })
    })
    .catch()
}

export function voteCardTx (http, address, mnemonic, cardid, voteType) {
  let req = {
    'base_req': {
      'from': address,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '1.5'
    },
    'voter': address,
    'votetype': voteType,
    'cardid': '' + cardid
  }

  txLoop.enqueue(_ => {
    return Promise.all([getAccInfo(http, address), voteCardGenerateTx(http, req)])
      .then(responses => {
        let accData = responses[0]
        let rawTx = responses[1].data
        
        let wallet = createWalletFromMnemonic(localStorage.mnemonic)
  
        let signedTx = sign(rawTx, accData, wallet)

        return broadcast(http, signedTx)
          .then(() => {
            notify.success('VOTED', 'Vote Transaction successfull!')
          })
      })
  })
}

function broadcast (http, signedTx) {
  notify.info('BROADCASTING', 'Transaction successfully created, sending it now into the blockchain.')
  return http.post('txs', {
    'tx': signedTx.value,
    'mode': 'block'
  }).then(res => {
    console.log('tx successfull broadcasted', res)
    getTx(http, res.data.txhash)
      .then(tx => { console.log('looked up tx:', tx) })
    return res
  }).catch(err => {
    if (err.response) {
      console.error(err.response.data)
      notify.fail('EPIC FAIL', err.response.data)
    } else {
      console.error(err)
    }
    throw err
  })
}

function getTx (http, hash) {
  return http.get('txs/' + hash)
    .catch(handleGetError)
}

function voteCardGenerateTx (http, reqBody) {
  return http.put('cardservice/vote_card', reqBody)
    .catch(handlePutError)
}

function saveCardContentGenerateTx (http, reqBody) {
  return http.put('cardservice/save_card_content', reqBody)
    .catch(handlePutError)
}

function getUserInfo (http, address) {
  return http.get('cardservice/user/' + address)
    .catch(handleGetError)
    .then(handleGetUser(R.__, address))
}

const handleGetUser = R.curry(handleGetUserCurryMe)
function handleGetUserCurryMe (res, address) {
  console.log('handleGetUser', res)
  if (res.data.result.Alias === '') {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
    throw new Error('account ' + address + ' is not registered')
  } else {
    return {
      alias: res.data.result.Alias,
      ownedCardSchemes: res.data.result.OwnedCardSchemes,
      ownedCards: res.data.result.OwnedCard,
      voteRights: res.data.result.VoteRights
      }
  }
}

export function getAccInfo (http, address) {
  return http.get('auth/accounts/' + address)
    .catch(handleGetError)
    .then(handleGetAcc(R.__, address))
}

const handleGetAcc = R.curry(handleGetAccCurryMe)
function handleGetAccCurryMe (res, address) {
  console.log('handleGetAcc', res)
  if (res.data.result.value.address === '') {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
    throw new Error('account ' + address + ' is not registered')
  } else {
    return {
      coins: res.data.result.value.coins,
      account_number: res.data.result.value.account_number,
      sequence: res.data.result.value.sequence
      }
  }
}

export function getCard (http, id) {
  return http.get('cardservice/cards/' + id)
    .catch(handleGetError)
    .then(handleGetCard(R.__, id))
}

const handleGetCard = R.curry(handleGetCardCurryMe)
function handleGetCardCurryMe (res, cardId) {
  console.log('handleGetCard', res)
  if (!res.data.result) {
    notify.fail('WTF', 'A card was looked up that does not exist in the blockchain.')
    throw new Error('Card with ' + cardId + ' does not exist.')
  } else {
    return {
      card: res.data.result
      }
  }
}

export function getVotableCards (http, address) {
  return http.get('cardservice/votable_cards/' + address)
    .catch(handleGetError)
    .then(handleGetVotableCards(R.__, address))
}

export function getGameInfo (http) {
  return http.get('cardservice/cardchain_info')
    .then(res => {
      console.log('gameinfo: ', res)
      return {
        cardSchemePrice: res.data.result
      }
    })
    .catch(handleGetError)
}

const handleGetVotableCards = R.curry(handleGetVotableCardsCurryMe)
function handleGetVotableCardsCurryMe (res, address) {
  console.log('handleGetVotableCards', res)
  if (res.data.result === null) {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
    return {
      unregistered: true
    }
  } else {
    return {
      votables: res.data.result
    }
  }
}

function handleGetError (res) {
  if (res.data) {
    notify.fail('OH SHIT', 'Something went terribly wrong.')
    throw new Error(res.data)
  } else {
    notify.fail('NO CONNECTION', 'No connection to the blockchain. Please freak out responsibly.')
    throw new Error(res)
  }
}

function handlePutError (err) {
  console.log('puterror', err.response)
  if (err.response.data) {
    notify.fail('OH SHIT', err.response.data.error)
    throw new Error(err.response.data)
  } else {
    notify.fail('NO CONNECTION', 'No connection to the blockchain. Please freak out responsibly.')
    throw new Error(err)
  }
}

function b64DecodeUnicode (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

class BlockchainInterface {
  isRunning = false
  queue = []

  enqueue (transaction) {
    this.queue.push(transaction)

    if (!this.isRunning) {
      this.run()
    }
  }

  run () {
    this.isRunning = true

    if (!R.isEmpty(this.queue)) {
      const transaction = this.queue[0]
      this.queue = R.drop(1, this.queue)

      transaction().finally(_ => this.run())
    } else {
      this.isRunning = false
    }
  }
}

const txLoop = new BlockchainInterface()

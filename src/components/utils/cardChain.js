import * as R from 'ramda'
import { entropyToMnemonic } from 'bip39'
import * as Random from 'randombytes'
import { signTx, createWalletFromMnemonic } from '@tendermint/sig/dist/web'

import { notify, emptyCard } from './utils.js'

export function parseCard (rawCard) {
  if (rawCard.Content) {
    let contentLens = R.lensProp('Content')
    let parseContent = item => R.set(contentLens, JSON.parse(b64DecodeUnicode(item.Content)), item)
    let card = parseContent(rawCard)
    let cardType = R.keys(card.Content)
    card = R.merge(card, card.Content[cardType[0]])

    card.image = b64DecodeUnicode(card.Image)
    card.nerflevel = parseInt(card.Nerflevel)
    card.type = cardType[0]

    return card
  } else {
    return emptyCard
  }
}

export function generateMnemonic () {
  let entropySize = 24 * 11 - 8
  let entropy = Random(entropySize / 8)
  return entropyToMnemonic(entropy)
}

function sign (rawTx, accData, wallet) {
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

const signAndBroadcast = R.curry( function (http, accInfoAndRawTx) {
  let accData = accInfoAndRawTx[0]
  let rawTx = accInfoAndRawTx[1].data
  let wallet = createWalletFromMnemonic(localStorage.mnemonic)
  let signedTx = sign(rawTx, accData, wallet)
  return broadcast(http, signedTx)
})

export function registerAccTx (http, alias) {
  // this tx is special because it is not signed by the user but by a special creator address
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

  txLoop.enqueue(() => {
    return Promise.all([getAccInfo(http, process.env.VUE_APP_CREATOR_ADDRESS), http.put('cardservice/create_user', reqBody)])
      .then(responses => {
        let accData = responses[0]
        let rawTx = responses[1].data
        let wallet = createWalletFromMnemonic(process.env.VUE_APP_CREATOR_MNEMONIC)

        let signedTx = sign(rawTx, accData, wallet)

        return broadcast(http, signedTx)
          .then(() => notify.success('EPIC WIN', 'You have successfully registered in the blockchain.'))
          .catch(() => {
            this.$notify({
              group: 'fail',
              title: 'Registration failed!'
            })
          })
      })
  })
}

export function buyCardSchemeTx (http, maxBid) {
  return new Promise(function(resolve, reject) {
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
  
    txLoop.enqueue(() => {
      return Promise.all([getAccInfo(http, localStorage.address), http.post('cardservice/buy_card_scheme', reqBody)])
        .then(responses => {
          let accData = responses[0]
          let rawTx = responses[1].data
          let wallet = createWalletFromMnemonic(localStorage.mnemonic)
  
          let signedTx = sign(rawTx, accData, wallet)
  
          return broadcast(http, signedTx)
            .then(() => { 
              notify.success('EPIC WIN', 'You have successfully bought a card scheme.') 
              resolve(getAccInfo(http, localStorage.address))
            })
            .catch(err => {
              console.error(err)
              if (err.response.data.error) {
                var errData = JSON.parse(err.response.data.error)
                if (errData.length > 0) {
                  var errLog = JSON.parse(errData[0].log)
                  notify.fail('IGNORE FEMALE, ACQUIRE CURRENCY', errLog.message)
                } else {
                  console.error(errData)
                  notify.fail('WHILE YOU WERE OUT', 'shit got serious.')
                }
              } else {
                console.error(err)
                notify.fail('WHILE YOU WERE OUT', 'shit got serious.')
              }
              reject(err)
            })
        })
    })
  })
}

export function saveContentToUnusedCardSchemeTx (http, card, onSuccessCallback) {
  return getUserInfo(http, localStorage.address)
    .then(user => {
      if (!user.ownedCardSchemes) {
        notify.fail('YOU MUST CONSTRUCT ADDITIONAL PYLONS', 'You don\'t own any card schemes. Please buy one before publishing.')
        throw new Error('account ' + localStorage.address + ' does not own card schemes')
      } else {
        let reqBody = {
          'base_req': {
            'from': localStorage.address,
            'chain_id': 'testCardchain',
            'gas': 'auto',
            'gas_adjustment': '10'
          },
          'owner': localStorage.address,
          'content': JSON.stringify(card.model),
          'image': card.image,
          'cardid': user.ownedCardSchemes[0],
          'notes': card.Notes
        }
        return reqBody
      }
    })
    .then(req => {
      txLoop.enqueue(() => {
        return Promise.all([getAccInfo(http, localStorage.address), saveCardContentGenerateTx(http, req)])
          .then(signAndBroadcast(http))
          .then(res => {
            notify.success('EPIC WIN', 'You have successfully published this card.')
            onSuccessCallback(res)
          })
          .catch(err => {
            notify.fail('FAIL HARD', err.message)
            console.error(err)
          })
      })
    })
}

export function saveContentToCardWithIdTx (http, card, onSuccessCallback) {
  let req = {
    'base_req': {
      'from': localStorage.address,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '10'
    },
    'owner': localStorage.address,
    'content': JSON.stringify(card.model),
    'image': card.image,
    'cardid': card.id,
    'notes': card.Notes
  }
  txLoop.enqueue(() => {
    return Promise.all([getAccInfo(http, localStorage.address), saveCardContentGenerateTx(http, req)])
      .then(signAndBroadcast(http))
      .then(res => {
        notify.success('EPIC WIN', 'You have successfully edited this card.')
        onSuccessCallback(res)
      })
      .catch(err => {
        notify.fail('FAIL HARD', err.message)
        console.error(err)
      })
  })
}

export function voteCardTx (http, cardid, voteType) {
  let req = {
    'base_req': {
      'from': localStorage.address,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '1.5'
    },
    'voter': localStorage.address,
    'votetype': voteType,
    'cardid': '' + cardid
  }

  txLoop.enqueue(() => {
    return Promise.all([getAccInfo(http, localStorage.address), voteCardGenerateTx(http, req)])
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
  }).catch(err => {
    if (err.response) {
      console.error(err.response.data)
      notify.fail('INVALID TX', err.response.data)
    } else {
      console.error(err)
    }
    notify.fail('WTF', err)
    throw err
  }).then(res => {
    console.log('tx successfull broadcasted', res)
    if (res.data.code) {
      notify.fail('EPIC FAIL', res.data.raw_log)
      throw new Error(res.data.raw_log)
    }
    getTx(http, res.data.txhash)
      .then(tx => { console.log('looked up tx:', tx) })
    return res
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
  if (validAddress(address)) {
    return http.get('cardservice/user/' + address)
      .catch(handleGetError)
      .then(handleGetUser(R.__, address))
  } else {
    notify.fail('Do you even?', 'Have a proper address? Please login or register.')
    throw new Error('please provide proper address')
  }
}

const handleGetUser = R.curry((res, address) => {
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
})

export function getAccInfo (http, address) {
  if (validAddress(address)) {
    return http.get('auth/accounts/' + address)
      .catch(handleGetError)
      .then(handleGetAcc(R.__, address))
  } else {
    notify.fail('Do you even?', 'Have a proper address? Please login or register.')
    throw new Error('please provide proper address')    
  }
}

const handleGetAcc = R.curry((res, address) => {
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
})

export function getCard (http, id) {
  return http.get('cardservice/cards/' + id)
    .catch(handleGetError)
    .then(handleGetCard(R.__, id))
}

const handleGetCard = R.curry((res, cardId) => {
  if (res.data.result.owner === '') {
    notify.fail('Card without Owner', 'If you can read this the programmers dun goofed.')
    throw new Error('Card without Owner: ' + cardId)
  }
  if (!res.data.result) {
    notify.fail('WTF', 'A card was looked up that does not exist in the blockchain.')
    throw new Error('Card with ' + cardId + ' does not exist.')
  } else {
    return {
      card: res.data.result
    }
  }
})

export function getCardList (http, owner, status, nameContains) {
  if (status != 'scheme' && status != 'prototype' && status != 'counciled' && status != 'trial' && status != 'permanent' && status != '') {
    notify.fail('INVALID STATUS', 'The requested card status is not valid.')
    throw new Error('CardList status invalid: ' + status)
  }
  return http.get('cardservice/cardList?' + (status ? 'status='+status : '') + (owner? '&owner='+owner : '') + (nameContains? '&nameContains='+nameContains : ''))
    .catch(handleGetError)
    .then(handleGetCardList(R.__, status))
}

const handleGetCardList = R.curry((res, type) => {
  if (res.data.result === '') {
    notify.fail('Sad', 'Basically the CardList is valid, but it is empty.')
    throw new Error('CardList Empty: ' + res)
  }
  if (!res.data.result) {
    notify.info('Empty', 'An empty cardList was returned by the blockchain.')
    throw new Error('CardList with type ' + type + ' did not return a proper result: ' + res)
  } else {
    return {
      cardList: res.data.result
    }
  }
})

export function getVotableCards (http, address) {
  if (validAddress(address)) {
    return http.get('cardservice/votable_cards/' + address)
      .catch(handleGetError)
      .then(handleGetVotableCards(R.__, address))
  } else {
    return Promise.reject(new Error('Address is invalid, please register your address in the blockchain. You can do this by clicking JOIN.'))
  }
}

const handleGetVotableCards = R.curry((res, address) => {
  // TODO check if it is possible to differentiate here between unregistered and no voting rights
  if (res.data.result === null) {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
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

export function getGameInfo (http) {
  return http.get('cardservice/cardchain_info')
    .then(res => {
      return {
        cardSchemePrice: res.data.result
      }
    })
    .catch(handleGetError)
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
  if (err.response.data) {
    notify.fail('OH SHIT', err.response.data.error)
    throw new Error(err.response.data)
  } else {
    notify.fail('NO CONNECTION', 'No connection to the blockchain. Please freak out responsibly.')
    throw new Error(err)
  }
}

function validAddress (address) {
  if (address) {
    return address.startsWith('cosmos')
  } else {
    return false
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

      transaction().finally(() => this.run())
    } else {
      this.isRunning = false
    }
  }
}

const txLoop = new BlockchainInterface()

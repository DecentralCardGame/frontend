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

export function generateAndBroadcastTx (http, route, from, reqBody, mnemonic, method = 'put') {
  let httpRequest
  switch (method) {
    case 'put':
      httpRequest = http.put
      break
    case 'post':
      httpRequest = http.post
      break
  }

  return Promise.all([getAccInfo(http, from), httpRequest(route, reqBody)])
    .then(responses => {
      let accData = responses[0].data.value
      let rawTx = responses[1].data

      let signed = signTx(rawTx, mnemonic, 'testCardchain', accData.account_number, accData.sequence)

      return broadcast(http, signed)
        .catch(err => {
          console.log(err)
          console.log(err.response.data.error)
        })
    })
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
    'alias': 'lourdi'
  }

  return Promise.all([getAccInfo(http, process.env.VUE_APP_CREATOR_ADDRESS), http.put('cardservice/create_user', reqBody)])
  .then(responses => {
    console.log('accstuff: ', responses[0].data.result.value)
    let accData = responses[0].data.result.value
    let rawTx = responses[1].data

    console.log('rawtx: ', rawTx)    

    const wallet = createWalletFromMnemonic(process.env.VUE_APP_CREATOR_MNEMONIC)

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

    console.log('unsigned tx:', JSON.stringify(unsignedTx))

    //let signed = signTx(rawTx, process.env.VUE_APP_CREATOR_MNEMONIC, 'testCardchain', accData.account_number, accData.sequence)
    let signed = signTx(unsignedTx, signMeta, wallet)

    console.log('signed tx: ', signed)

    let finalTx = {
      type:"cosmos-sdk/StdTx",
      value: signed
    };

    return broadcast(http, finalTx)
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
      let accData = responses[0].data.value
      let rawTx = responses[1].data

      let signed = signTx(rawTx, mnemonic, 'testCardchain', accData.account_number, accData.sequence)

      return broadcast(http, signed)
    })
}

export function saveContentToUnusedCardSchemeTx (http, address, mnemonic, cardContent, onSuccessCallback) {
  return getUserInfo(http, address)
    .then(userInfo => {
      let freeCardSchemes = userInfo.data.value.OwnedCardSchemes

      if (!freeCardSchemes) {
        notify.fail('YOU MUST CONSTRUCT ADDITIONAL PYLONS', 'You don\'t own any card schemes. Please buy one before publishing.')
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
          'cardid': freeCardSchemes[0]
        }
        return reqBody
      }
    })
    .then(req => {
      txLoop.enqueue(_ => {
        return Promise.all([getAccInfo(http, address), saveCardContentGenerateTx(http, req)])
          .then(res => {
            let accData = res[0].data.value
            let rawTx = res[1].data
            let signed = signTx(rawTx, mnemonic, process.env.VUE_APP_CHAIN_ID, accData.account_number, accData.sequence)
            return broadcast(http, signed)
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
      .then(res => {
        let accData = res[0].data.value
        let rawTx = res[1].data
        let signed = signTx(rawTx, mnemonic, process.env.VUE_APP_CHAIN_ID, accData.account_number, accData.sequence)
        return broadcast(http, signed)
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
}

function voteCardGenerateTx (http, reqBody) {
  return http.put('cardservice/vote_card', reqBody)
}

function saveCardContentGenerateTx (http, reqBody) {
  return http.put('cardservice/save_card_content', reqBody)
}

function getUserInfo (http, address) {
  return http.get('cardservice/user/' + address)
    .then(handleGetAcc(R.__, address))
    .catch(handleGetError(R.__, address))
}

export function getAccInfo (http, address) {
  return http.get('auth/accounts/' + address)
    .then(handleGetAcc(R.__, address))
    .catch(handleGetError(R.__, address))
}

export function getCard (http, id) {
  return http.get('cardservice/cards/' + id)
}

export function getVotableCards (http, address) {
  return http.get('cardservice/votable_cards/' + address)
    .then(handleGetAcc(R.__, address))
    .catch(handleGetAcc(R.__, address))
}

export function getGameInfo (http) {
  return http.get('cardservice/cardchain_info')
    .catch(handleGetError(R.__, ''))
}

const handleGetAcc = R.curry(handleGetAccCurryMe)
function handleGetAccCurryMe (res, address) {
  console.log('handleGetAcc')
  if (res.data === '') {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
    throw new Error('account ' + address + ' is not registered')
  } else if (res.response) {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
    console.error(res.response.data.error)
    return { unregistered: true }
  } else {
    return res
  }
}

const handleGetError = R.curry(handleGetErrorCurryMe)
function handleGetErrorCurryMe (res, address) {
  if (res.response) {
    notify.fail('YOU SHALL NOT PASS!', address + ' is not registered. Please click Join and register in the blockchain.')
    throw new Error(res.response.data.error)
  } else {
    throw new Error(res)
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

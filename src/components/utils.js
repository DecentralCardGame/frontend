import { signTx } from 'signcosmostx/signStuff'
import Vue from 'vue'
import * as R from 'ramda'

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

export function saveContentToUnusedCardSchemeTx (http, address, mnemonic, cardContent) {
  return getUserInfo(http, address)
    .then(userInfo => {
      let freeCardSchemes = userInfo.data.value.OwnedCardSchemes

      if (!freeCardSchemes) {
        throw new Error('no cards available')
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
      return Promise.all([getAccInfo(http, address), saveCardContent(http, req)])
        .then(res => {
          let accData = res[0].data.value
          let rawTx = res[1].data
          let signed = signTx(rawTx, mnemonic, process.env.VUE_APP_CHAIN_ID, accData.account_number, accData.sequence)
          return broadcast(http, signed)
        })
    })
}

function broadcast (http, signedTx) {
  console.log('broadcasting: ', signedTx)
  return http.post('txs', {
    'tx': signedTx.value,
    'mode': 'block'
  }).then(res => {
    console.log('tx successfull broadcasted', res)
    return res
  }).catch(err => {
    console.error(err.response.data)
    throw new Error(err)
  })
}

function saveCardContent (http, reqBody) {
  return http.put('cardservice/save_card_content', reqBody)
}

function getUserInfo (http, address) {
  return http.get('cardservice/user/' + address)
    .then(handleGetAcc(R.__, address))
    .catch(handleGetError(R.__, address))
}

function getAccInfo (http, address) {
  return http.get('auth/accounts/' + address)
    .then(handleGetAcc(R.__, address))
    .catch(handleGetError(R.__, address))
}

const handleGetAcc = R.curry(handleGetAccCurryMe)
function handleGetAccCurryMe (res, address) {
  if (res.data === '') {
    notify.fail('OH SHIT', address + ' is not registered. Please click Join and register in the blockchain.')
    throw new Error('account ' + address + ' is not registered')
  } else {
    return res
  }
}

const handleGetError = R.curry(handleGetErrorCurryMe)
function handleGetErrorCurryMe (res, address) {
  if (res.response.data.error) {
    notify.fail('OH SHIT', address + ' is not registered. Please click Join and register in the blockchain.')
    throw new Error(res.response.data.error)
  } else {
    throw new Error(res)
  }
}

export const notify = {
  fail: function (title, text) {
    Vue.notify({
      group: 'fail',
      title: title,
      text: text
    })
  },
  success: function (title, text) {
    Vue.notify({
      group: 'success',
      title: title,
      text: text
    })
  },
  info: function (title, text) {
    Vue.notify({
      group: 'info',
      title: title,
      text: text
    })
  }
}

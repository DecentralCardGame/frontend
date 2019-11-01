import { signTx } from 'signcosmostx/signStuff'

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

export function saveContentToUnusedCardSchemeTx (http, address, mnemonic, cardContent, cardId) {
  let reqBody = {
    'base_req': {
      'from': localStorage.address,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '1.5'
    },
    'owner': localStorage.address,
    'content': JSON.stringify(cardContent),
    'cardid': JSON.stringify(cardId)
  }

  return Promise.all([getUserInfo(http, address), getAccInfo(http, address), saveCardContent(http, reqBody)])
    .then(res => {
      let userInfo = res[0].data
      let accData = res[1].data.value
      let rawTx = res[2].data

      console.log(accData)
      console.log(userInfo)

      let freeCardSchemes = userInfo.value.OwnedCardSchemes

      if (!freeCardSchemes) {
        throw new Error('no cards available')
      } else {
        rawTx.value.msg[0].value.CardId = freeCardSchemes[0]
        let signed = signTx(rawTx, mnemonic, process.env.VUE_APP_CHAIN_ID, accData.account_number, accData.sequence)
        return broadcast(http, signed)
      }
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
}

function getAccInfo (http, address) {
  return http.get('auth/accounts/' + address)
}

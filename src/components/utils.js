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

  return Promise.all([http.get('auth/accounts/' + from), httpRequest(route, reqBody)])
    .then(responses => {
      let accData = responses[0].data.value
      let rawTx = responses[1].data

      let signed = signTx(rawTx, mnemonic, 'testCardchain', accData.account_number, accData.sequence)

      return http.post('txs', {
        'tx': signed.value,
        'mode': 'block'
      })
        .catch(err => {
          console.log(err)
          console.log(err.response.data.error)
        })
    })
}

export function saveContentToUnusedCardScheme (http, address, mnemonic, cardContent) {
  let reqBody = {
    'base_req': {
      'from': localStorage.address,
      'chain_id': 'testCardchain',
      'gas': 'auto',
      'gas_adjustment': '1.5'
    },
    'owner': localStorage.address,
    'content': JSON.stringify(cardContent),
    'cardid': '1'
  }

  return Promise.all([getUserInfo(http, address), getAccInfo(http, address), saveCardContent(http, reqBody)])
    .then(res => {
      let userInfo = res[0].data
      let accData = res[1].data.value
      let rawTx = res[2].data

      let freeCardSchemes = userInfo.value.OwnedCardSchemes

      if (!freeCardSchemes) {
        console.log('NO FUCKING CARDS AVAILABLE') // TODO here a user interaction should happen, like wiggling button and error msg
      } else {

        rawTx.value.msg[0].value.CardId = freeCardSchemes[0]
        let signed = signTx(rawTx, mnemonic, process.env.VUE_APP_CHAIN_ID, accData.account_number, accData.sequence)
        console.log(signed)
        return broadcast(http, signed)
      }

      console.log(res)
    })
}

function broadcast (http, signedTx) {
  return http.post('txs', {
    'tx': signedTx.value,
    'mode': 'block'
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

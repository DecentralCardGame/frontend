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

import { signTx } from 'signcosmostx/signStuff'

export function generateAndBroadcastTx (http, route, from, reqBody, mnemonic, method = 'put') {
  return http.get('auth/accounts/' + from)
    .then(acc => {
      let httpRequest
      switch (method) {
        case 'put':
          httpRequest = http.put
          break
        case 'post':
          httpRequest = http.post
          break
      }
      return httpRequest(route, reqBody)
        .then((response) => {
          let signed = signTx(response.data, mnemonic, 'testCardchain', acc.data.value.account_number, acc.data.value.sequence)

          return http.post('txs', {
            'tx': signed.value,
            'mode': 'block'
          })
            .catch(e => {
              console.log(e)
              console.log(e.response.data.error)
            })
        })
    })
}

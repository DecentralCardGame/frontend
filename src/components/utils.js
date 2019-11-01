import { signTx } from 'signcosmostx/signStuff'

export function generateAndBroadcastTx (http, route, from, reqBody, mnemonic) {
  return http.get('auth/accounts/' + from)
    .then(acc => {
      return http.put(route, reqBody)
        .then((response) => {
          let signed = signTx(response.data, mnemonic, 'testCardchain', acc.data.value.account_number, acc.data.value.sequence)

          return http.post('txs', {
            'tx': signed.value,
            'mode': 'block'
          })
        })
    })
}

<template>
  <img src="https://via.placeholder.com/200x300/000000/FFFFFF/?text=CARD-PLACEHOLDER" alt="">
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardComponent',
  data () {
    return {
      cardID: 0
    }
  },
  methods: {
    vote (voteType) {
      axios.put(
        this.apiURL + '/cardservice/vote_card',
        {
          'base_req': {
            'from': 'globally fetched users key',
            'chain_id': this.chainID,
            'sequence': '18',
            'account_number': '0',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'voter': 'globally fetched users key',
          'votetype': voteType,
          'cardid': this.cardID
        }).then(response => (this.cards = response.data))
    },
    transfer (reciever) {
      axios.post(
        this.apiURL + '/cardservice/transfer_card',
        {

          'base_req': {
            'from': 'globally fetched users key',
            'chain_id': this.chainID,
            'sequence': '2',
            'account_number': '0',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'sender': 'globally fetched users key',
          'receiver': reciever,
          'cardid': this.cardID
        }).then(response => (this.cards = response.data))
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>

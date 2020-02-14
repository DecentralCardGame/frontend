<template>
  <div>
    <h2>Card Voting</h2>
    <div class="voter">
      <vue-swing
        @throwoutup="vote(1, 'fair_enough')"
        @throwoutright="vote(1, 'overpowered')"
        @throwoutleft="vote(1, 'underpowered')"
        :config="config"
        class="card"
      >
        <div class="box" v-if="card.name">
          <CardComponent v-bind:model="card" v-bind:imageURL="card.image"></CardComponent>
        </div>
        <span v-if="!card.name"> Es gibt leider nix zu voten </span>
      </vue-swing>
      <button @click="vote(1, 'fair_enough')">Fair Enough</button>
      <button @click="vote(1, 'overpowered')">Overpowered</button>
      <button @click="vote(1, 'underpowered')">Underpowered</button>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '../CardComponent'
import VueSwing from 'vue-swing'

// eslint-disable-next-line no-unused-vars
import { signTx } from 'signcosmostx/signStuff'
import { parseCard, getVotableCards, generateAndBroadcastTx } from '../cardChain.js'

export default {
  name: 'VotingPage',
  components: {CardComponent},
  data () {
    return {
      voteRights: [],
      card: {},
      config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      }
    }
  },
  mounted () {
    getVotableCards(this.$http, localStorage.address)
      .then(res => {
        if (res.data) {
          if (res.data.length > 0) {
          this.voteRights = res.data
          this.$http.get('cardservice/cards/' + R.last(this.voteRights).CardId)
            .then(res => {
              this.card = parseCard(res.data.value)
            })
          } else {
            console.log(res.data)
            console.log('yes')
          }
        }
      })
  },
  methods: {
    vote (cardid, type) {
      console.log('THROWOUT')

      let reqBody = {
        'base_req': {
          'from': localStorage.address,
          'chain_id': 'testCardchain',
          'gas': 'auto',
          'gas_adjustment': '1.5'
        },
        'voter': localStorage.address,
        'votetype': type,
        'cardid': '' + cardid
      }

      generateAndBroadcastTx(this.$http, 'cardservice/vote_card', localStorage.address, reqBody, localStorage.mnemonic)
        .then(console.log)
    }
  }
}
</script>

<style scoped>
.box {
  text-shadow: none;
  position: relative;
}
.voter {
  min-height: 100vh;
}
vue-swing {
  min-height: 100vh;
}
</style>

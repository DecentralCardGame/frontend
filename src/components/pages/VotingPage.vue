<template>
  <div>
    <h2>Card Voting</h2>
    <div class="voter">
        <div class="box" v-if="votingActive">
          <vue-swing
          @throwoutup="vote(1, 'fair_enough')"
          @throwoutright="vote(1, 'overpowered')"
          @throwoutleft="vote(1, 'underpowered')"
          :config="config"
          class="card">
          <CardComponent v-bind:model="currentCard" v-bind:imageURL="currentCard.image"></CardComponent>
          </vue-swing>
          <button @click="vote(1, 'fair_enough')">Fair Enough</button>
          <button @click="vote(1, 'overpowered')">Overpowered</button>
          <button @click="vote(1, 'underpowered')">Underpowered</button>
        </div>
        <div v-if="!votingActive">
        <span>You cannot vote on cards.</span>
        <span>This is either because you are not registered or you have already voted on all cards.</span><br>
        <span>Come back tomorrow if you have already registered to get more voting rights or join today.</span>
        </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '../CardComponent'
import VueSwing from 'vue-swing'

// eslint-disable-next-line no-unused-vars
import { signTx } from 'signcosmostx/signStuff'
import { parseCard, getVotableCards, voteCardTx } from '../cardChain.js'

export default {
  name: 'VotingPage',
  components: {CardComponent},
  data () {
    return {
      votingActive: false,
      voteRights: [],
      cards: Array,
      currentCard: {},
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
          this.voteRights = res.data

          if (res.data.length > 0) {
            console.log(this.voteRights)

            
            R.takeLast(2, this.voteRights).forEach(voteRight => {
              this.$http.get('cardservice/cards/' + voteRight.CardId).then(res => {
                this.cards = []
                this.cards.push(parseCard(res.data.value))
                R.last(this.cards).id = voteRight.CardId
                console.log('cardes', this.cards)

                if (R.isEmpty(this.currentCard)) {
                  this.showNextCard()
                }
              })
            })
          } else {
            this.votingActive = false
          }
        } else {
          this.votingActive = false
          console.error('getVotableCards returned non-readable data: ', res)
        }
      })
  },
  methods: {
    vote (cardid, type) {
      console.log('THROWOUT')

      voteCardTx(this.$http, localStorage.address, localStorage.mnemonic, this.currentCard.id, type)

      if (R.isEmpty(this.cards)) {
        getVotableCards(this.$http, localStorage.address)
      } else {
        this.showNextCard()
      }
    },
    getNextCard () {

    },
    showNextCard () {
      this.votingActive = true
      if (R.isEmpty(this.cards)) {
        this.votingActive = false
      }
      this.currentCard = R.last(this.cards)
      this.cards = R.dropLast(this.cards)
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

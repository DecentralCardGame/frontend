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
          <CardComponent width="50%" v-bind:model="currentCard" v-bind:imageURL="currentCard.image"></CardComponent>
          </vue-swing>
          <button @click="vote(1, 'fair_enough')">Fair Enough</button>
          <button @click="vote(1, 'overpowered')">Overpowered</button>
          <button @click="vote(1, 'underpowered')">Underpowered</button>
        </div>
        <div v-if="!votingActive">
          <span>You cannot vote on cards.</span>
          <div v-if="noMoreVotesLeft">
            <span>You have already voted on all cards. Come back tomorrow to vote again.</span>
          </div>
          <div v-if="unregistered">
            <span>You are not registered. To vote on cards you have to register, press the Join button to register.</span>
            <span>Afer registering it might take a few seconds until your account becomes active.</span>
          </div>
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
      unregistered: false,
      votingActive: false,
      noMoreVotesLeft: false,
      voteRights: [],
      cards: [],
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

          if (this.voteRights.length > 0) {
            console.log('voteRights:', this.voteRights)

            this.getNextCard()
              .then(res => {
                this.showNextCard()
              })
            this.getNextCard()
          } else {
            this.votingActive = false
          }
        } else if (res.data === null) {
          this.votingActive = false
          this.noMoreVotesLeft = true
          console.log('no more voting rights')
        } else if (res.unregistered === true) {
          this.unregistered = true
        } else {
          this.votingActive = false
          console.error('getVotableCards returned non-readable data: ', res)
        }
      })
  },
  methods: {
    vote (cardid, type) {
      console.log('vote cast for cardid', cardid, 'voted: ', type)

      this.getNextCard()
      voteCardTx(this.$http, localStorage.address, localStorage.mnemonic, this.currentCard.id, type)

      if (R.isEmpty(this.cards)) {
        if (!R.isEmpty(this.voteRights)) {
          this.getNextCard()
            .then(this.showNextCard())
        } else {
          this.votingActive = false
          this.noMoreVotesLeft = true
        }
      } else {
        this.showNextCard()
      }
    },
    getNextCard () {
      console.log('votingRights.length:', this.voteRights.length)
      if (this.voteRights.length > 0) {
        let nextCard = R.last(this.voteRights)
        this.voteRights = R.dropLast(1, this.voteRights)

        return this.$http.get('cardservice/cards/' + nextCard.CardId).then(res => {
          this.cards.push(parseCard(res.data.value))
          R.last(this.cards).id = nextCard.CardId
        })
      } else {
        console.error('no cards left')
      }
    },
    showNextCard () {
      this.votingActive = true
      if (R.isEmpty(this.cards)) {
        this.votingActive = false
      }
      this.currentCard = R.last(this.cards)
      this.cards = R.dropLast(1, this.cards)
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

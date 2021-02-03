<template>
  <div>
    <h2 class="header__h2">
      Card Voting
    </h2>
    <p class="header__p">
      Take part in the action and share your opinions about community cards.
    </p>
    <br>
    <div class="voter">
      <div
        v-if="votingActive"
        class="box"
      >
        <div
          class="gallery__view__card"
        >
          <CardComponent
            :model="currentCard"
            :image-u-r-l="currentCard.image"
          />
        </div>

        <br>
        <div class="button-container">
          <button @click="vote('fair_enough')">
            Fair Enough
          </button>
          <button @click="vote('overpowered')">
            Overpowered
          </button>
          <button @click="vote('underpowered')">
            Underpowered
          </button>
          <button @click="vote('inappropriate')">
            Inappropriate
          </button>
        </div>
      </div>
      <div v-if="!votingActive">
        <span>You cannot vote on cards.</span>
        <div v-if="noMoreVotesLeft">
          <span>You have already voted on all cards. Come back tomorrow to vote again.</span>
        </div>
        <div v-if="unregistered">
          <span>You are not registered. To vote on cards you have to register, press the Join button to register. </span>
          <span>Afer registering it might take a few seconds until your account becomes active.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '../components/CardComponent'
import VueSwing from 'vue-swing'
import { creditsFromCoins } from '../components/utils/utils.js'

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
    console.log('this in voting page', this)
    this.$cardChain.getVotableCards(this.$store.getters.getUserAddress)
      .then(res => {
        console.log('getVotableCards:', res)
        if (res.votables) {
          this.voteRights = res.votables

          if (this.voteRights.length > 0) {
            console.log('voteRights:', this.voteRights)

            this.getNextCard()
              .then(() => {
                this.showNextCard()
              })
            this.getNextCard()
          } else {
            this.votingActive = false
          }
        } else if (res.votables === null) {
          this.votingActive = false
          this.noMoreVotesLeft = true
          console.log('no more voting rights')
        } else if (res.unregistered === true) {
          this.unregistered = true
          this.notifyFail('NOT REGISTERED', 'You are not registered in the blockchain. Please register to obtain voting rights.')
        } else if (res.noVoteRights === true) {
          this.noMoreVotesLeft = true
          this.notifyFail('No Vote Rights', 'You do not have any voting rights, therefore you cannot vote on cards.')
        } else {
          this.votingActive = false
          console.error('getVotableCards returned non-readable data: ', res)
        }
      })
      .catch(res => {
        this.notifyFail('OH NOES', res)
      })
  },
  methods: {
    vote (type) {
      this.getNextCard()
      this.$cardChain.voteCardTx(this.currentCard.id, type)
      .then(acc => {
        this.creditsAvailable = creditsFromCoins(acc.coins)
        this.$store.commit('setUserCredits', this.creditsAvailable) 
      })
      console.log('vote cast for cardid', this.currentCard.id, 'voted: ', type)

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

        return this.$cardChain.getCard(nextCard.CardId)
          .then(res => {
            let parsedCard = this.$cardChain.parseCard(res.card)
            console.log('currentCard', parsedCard)
            if (parsedCard) {
              this.cards.push(parsedCard)
              R.last(this.cards).id = nextCard.CardId
            } else {
              console.error('card could not be parsed', res.card)
            }
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
  min-height: 10vh;
}
.gallery__view__card {
  margin: auto;
  width: 50%;
  max-width:500px;
}
</style>

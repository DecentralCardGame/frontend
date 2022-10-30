<template>
  <div>
    <h2 class="header__h2">
      Card Voting
    </h2>
    <p class="header__p">
      Take part in the action and share your opinions about community cards. <br>
      See results of <router-link :to="{ name: 'VotingResults' }">
        last weeks voting here
      </router-link>.
    </p>
    <br>
    <div class="voter ccbutton">
      <div
        v-if="votingActive || councilCardAvailable"
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
        <div 
          v-if="councilCardAvailable"
          class="button-container"
        >
          <div
            :class="[isSelected[0] ? 'council-button--selected' : '', 'council-button']"
            @click="setCouncilOption(0)"
          >
            Approve
          </div>
          <div
            :class="[isSelected[1] ? 'council-button--selected' : '', 'council-button']"
            @click="setCouncilOption(1)"
          >
            Reject
          </div>
          <div
            :class="[isSelected[2] ? 'council-button--selected' : '', 'council-button']"
            @click="setCouncilOption(2)"
          >
            Revise
          </div>
          <br><br>
          <input 
            v-if="isSelected[2]" 
            v-model="councilNotes"
            placeholder="Notes"
          >
          <br>
          Add a password to your response. You will need this to reveal your decision after all council members have voted.
          <input 
            v-model="councilSecret"
            placeholder="Secret"
          >
          
          <button 
            class="button-submit"
            @click="publishCouncilDecision()"
          >
            Submit
          </button>
        </div>
        <button 
          class="button-submit"
          @click="debug()"
        >
          DEBUG
        </button>
        <div 
          v-if="!councilCardAvailable"
          class="button-container"
        >
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
      <div v-if="!votingActive && !councilCardAvailable">
        <span>You cannot vote on cards. Please make sure you are logged in with your wallet.</span>
        <div v-if="noMoreVotesLeft && !councilCardAvailable">
          <span>Perhaps you have already voted on all cards. Come back tomorrow to vote again.</span>
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
import CardComponent from '../components/elements/CardComponent'
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
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      },
      user: {},
      isSelected: [false, false, false],
      councilCardAvailable: false,
      councilId: -1,
      councilDecision: -1,
      councilNotes: "",
      councilCard: -1,
      councilSecret: "",
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
      if (this.$store.getters["getLoggedIn"]) {
        this.init()
      }
    }
  },
  mounted () {
    console.log("loggedin? ", this.$store.getters["getLoggedIn"])
    if (this.$store.getters["getLoggedIn"]) {
      this.init()
    }
    else {
      this.notifyInfo('Not logged in', 'You must login to be able to vote.')
    }
  },
  methods: {
    init () {
      console.log("initializing")

      this.getUser()


      this.$cardChain.getVotableCards(this.$store.getters['common/wallet/address'])
        .then(res => {
          console.log("getting card list: " , res)
          this.$cardChain.getCardList("", "playable", "", "", "", "", "", "")
          .then(cards => {
            console.log('getVotableCards: ', res)

            console.log("inside get votable cards")
              if (this.user.CouncilStatus === "startedCouncil") {
                //Load the council card
                console.log("Initializing council: ", this.user.CouncilStatus)
                this.initCouncil()
              }
            
            if (res.votables) {
              this.voteRights = res.votables.voteRights

              var cleaned = []
              for (var i = 0; i < this.voteRights.length; i++) {
                if (cards.cardsList.includes(this.voteRights[i].cardId)) {
                  cleaned.push(this.voteRights[i])
                }
              }

              this.voteRights = cleaned
              

              if (this.voteRights.length > 0) {
                console.log('voteRights:', this.voteRights)
                if(!this.councilCardAvailable) { //Only show the next card already if there's no council card to vote on
                this.getNextCard()
                  .then(() => {
                    this.showNextCard()
                  })
                this.getNextCard()
                }
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
        })
        .catch(res => {
          this.notifyFail('OH NOES', res)
        })
    },
    initCouncil(){
      //this.debug()
      console.log("initializing council")
      this.$cardChain.getGameInfo() //Query to get the amoun of councils?
      .then(res => {
        let councilsNumber = res.councilsNumber 
        for(let i = 0; i < councilsNumber; i++) { //Cycle through all councils to see which ones contains our user.
          this.$cardChain.getCouncil(i)
          .then(res => {
            console.log("init council res: ", res)
            let users = res.data.voters
            console.log("Voters: ", users)
            if(!users) {
              console.log("No users in council")
              return;
            }
            for(let i = 0; i < users.length; i++){
              if(users[i] === this.$store.getters['common/wallet/address']) {
                this.councilId = i
                this.councilCard = res.data.cardId //If user address is found in querried council, add the card
                this.councilCardAvailable = true
                console.log("User council found!")
                this.getNextCard().then(() => {
                  this.showNextCard()
                })
                return;
              }
            }
          })
        }
      }).catch(res => {
        console.error(res)
      })
    },
    getUser() {
      this.$cardChain.getUserInfo(this.$store.getters['common/wallet/address'])
      .then(user => {
        this.user = user
        console.log("user: ", user)
      })
    },
    vote (type) {
      this.getNextCard()
      this.$cardChain.voteCardTx(this.currentCard.id, type)
        .then(_ => {
          this.$cardChain.updateUserCredits()
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
    getNextCouncilCard(id){
      return this.$cardChain.getCard(id)
          .then(res => {
            console.log("council card res", res)
            let parsedCard = this.$cardChain.cardObjectToWebModel(res)
            console.log('current council card', parsedCard)
            if (parsedCard) {
              this.cards.push(parsedCard)
              R.last(this.cards).id = id
            } else {
              console.error('council card could not be parsed', res)
            }
          })
    },
    getNextVoteCard() {
      console.log('votingRights.length:', this.voteRights.length)
      if (this.voteRights.length > 0) {

        let nextCard = R.last(this.voteRights)
        //console.log("nextCard", nextCard)
        this.voteRights = R.dropLast(1, this.voteRights)

        return this.$cardChain.getCard(nextCard.cardId)
          .then(res => {
            //console.log("res", res)
            let parsedCard = this.$cardChain.cardObjectToWebModel(res)
            console.log('currentCard', parsedCard)
            if (parsedCard) {
              this.cards.push(parsedCard)
              R.last(this.cards).id = nextCard.cardId
            } else {
              console.error('card could not be parsed', res)
            }
          })
      } else {
        console.error('no cards left')
      }
    },
    getNextCard () {
      if(this.councilCardAvailable) {
        console.log("Council card: ", this.councilCard)
        return this.getNextCouncilCard(this.councilCard)
      }
      else {
        this.councilCardAvailable = false
        return this.getNextVoteCard()
      }      
    },
    showNextCard () {
      this.votingActive = true
      if (R.isEmpty(this.cards)) {
        this.votingActive = false
      }
      this.currentCard = R.last(this.cards)
      this.cards = R.dropLast(1, this.cards)
    },
    setCouncilOption(n) {
      for (let i = 0; i < this.isSelected.length; i++) {
        if(i === n) {
          this.isSelected[i] = true
          this.councilDecision = i
        }
        else this.isSelected[i] = false
      }
    },

    publishCouncilDecision(){
      this.notifyInfo("Committing!", "Council response is being sent, please wait!")
      let decision
      if(this.councilDecision === -1){
        this.notifyFail("Careful there!", "Please make a choice before submitting")
      }else if((this.councilDecision === 2 && this.councilNotes === '')){
        this.notifyFail("Hold up!", "Please leave a note for the author!")
      }else if(this.councilSecret === ''){
        this.notifyFail("Hold up!", "Please add a password for your decision")
      }else{
        
        switch(this.councilDecision) {
          case 0: {
            decision = "Approve"
            break
          }
          case 1: {
            decision = "Reject"
            break
          }
          case 2: {
            decision = "Revise"
            break
          }
          default: {
            break
          }
        }

        //Send submit transaction
         this.$cardChain.commitCouncilResponse(this.councilId, decision, this.councilSecret, this.councilNotes)
         .then(res => {
            console.log("council committed: ", res)
            this.councilCardAvailable = false
         }).catch(err => {
          console.log("council commit error: ", err)
          //If committing failed, return so the user doesnt have to refresh to get back to council options
          return
         })    
      }
      //Move on to voting for cards
      if (R.isEmpty(this.cards)) {
        if (!R.isEmpty(this.voteRights)) {
          this.getNextCard()
            .then(this.showNextCard())
        } else {
          this.votingActive = false
          this.noMoreVotesLeft = true
        }

    }
  }
}
}
</script>

<style lang="scss" scoped>
@import "../scss/variables";

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
  height: 75vh;
  max-width:500px;
}
.council-button {
  cursor: pointer;
  display:inline;
  margin-top: 1rem;
  margin: 0.25rem;
  border: $border-thickness solid rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.5rem;

  &.council-button--selected {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: $white;
  }
}
.button-submit {
  margin-top: 1rem;
}
</style>

<template>
  <div align="center">
    <div class="voter ccbutton">
      <br>
      <h1>Vote Encounters</h1>
      <p>Vote on cards that you enountered in-game.</p>
      <br>
      <div>
        <div class="InfoContainer">
          <div
            v-if="votingActive"
            class="ELement Info"
          >
            <h3>{{ currentCard.CardName }}</h3>
            <p
              v-if="currentCard.FlavourText"
              class="FlavourText"
            >
              "{{ currentCard.FlavourText }}"
            </p>
            <br>
            <h3>Advanced Card Information</h3>
            <p>
              Votepool: {{ votePool }} <br>
              Status: {{ currentCard.status }} <br>
            </p>
            <br><br>
            <keyword-component
              :keywords="currentCard.Keywords"
            />
          </div>
          <div
            v-if="votingActive"
            class="ELement"
          >
            <CardComponent
              :model="currentCard"
              :image-u-r-l="currentCard.image"
            />
          </div>
          <div
            v-if="noMoreVotesLeft && $store.getters['getLoggedIn']"
            class="ELement"
          >
            <img
              style="max-width:25em;"
              src="@/assets/icon/noCard.png"
            >
            <br><br>
            <p>It seams like you have voted on all cards you've encountered. Come back here, when you've played more matches.</p>
          </div>
          <div
            v-if="!$store.getters['getLoggedIn']"
            class="ELement"
          >
            <p>You cannot vote on cards. Please login with your wallet.</p>
          </div>
          <div v-if="unregistered">
            <p>You are not registered. To vote on cards you have to register, press the Join button to register.</p>
            <p>Afer registering it might take a few seconds until your account becomes active.</p>
          </div>
        </div>
      </div>

      <br>
      <div
        v-if="votingActive"
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
  </div>
</template>

<script>
import * as R from "ramda";
import { Coin } from "@/utils/coins";
import CardComponent from "@/components/elements/CardComponent";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";

export default {
  name: "EncounterVotingComponent",
  components: { CardComponent, KeywordComponent },
  data() {
    return {
      unregistered: false,
      votingActive: false,
      noMoreVotesLeft: false,
      voteRights: [],
      cards: [],
      currentCard: {},
      votePool: "",
      config: {
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      }
    };
  },
  watch: {
    "$store.state.common.wallet.selectedAddress": function() {
      if (this.$store.getters["getLoggedIn"]) {
        this.init();
      }
    }
  },
  mounted() {
    console.log("loggedin? ", this.$store.getters["getLoggedIn"]);
    if (this.$store.getters["getLoggedIn"]) {
      this.init();
    } else {
      this.notifyInfo("Not logged in", "You must login to be able to vote.");
    }
  },
  methods: {
    init() {
      this.$cardChain.getVotableCards(this.$store.getters["common/wallet/address"])
        .then(res => {
          this.$cardChain.getCardList("", "playable", "", "", "", "", "", "")
            .then(cards => {
              console.log("getVotableCards:", res);
              if (res.votables) {
                this.voteRights = res.votables.voteRights;

                let cleaned = [];
                for (let i = 0; i < this.voteRights.length; i++) {
                  if (cards.cardsList.includes(this.voteRights[i].cardId)) {
                    cleaned.push(this.voteRights[i]);
                  }
                }

                this.voteRights = cleaned;
                this.unregistered = false;
                this.noMoreVotesLeft = false;
                this.votingActive = false;

                if (this.voteRights.length > 0) {
                  console.log("voteRights:", this.voteRights);

                  this.getNextCard()
                    .then(() => {
                      this.showNextCard();
                    });
                  this.getNextCard();
                } else {
                  this.votingActive = false;
                }
              } else if (res.votables === null) {
                this.votingActive = false;
                this.noMoreVotesLeft = true;
                console.log("no more voting rights");
              } else if (res.unregistered === true) {
                this.unregistered = true;
                this.notifyFail("NOT REGISTERED", "You are not registered in the blockchain. Please register to obtain voting rights.");
              } else if (res.noVoteRights === true) {
                this.noMoreVotesLeft = true;
                this.notifyInfo("No Vote Rights", "You do not have any voting rights, therefore you cannot vote on cards.");
              } else {
                this.votingActive = false;
                console.error("getVotableCards returned non-readable data: ", res);
              }
            });
        })
        .catch(res => {
          this.notifyFail("OH NOES", res);
        });
    },
    vote(type) {
      this.getNextCard();
      this.$cardChain.voteCardTx(this.currentCard.id, type)
        .then(_ => {
          this.$cardChain.updateUserCredits();
        });
      console.log("vote cast for cardid", this.currentCard.id, "voted: ", type);

      if (R.isEmpty(this.cards)) {
        if (!R.isEmpty(this.voteRights)) {
          this.getNextCard()
            .then(this.showNextCard);
        } else {
          this.votingActive = false;
          this.noMoreVotesLeft = true;
        }
      } else {
        this.showNextCard();
      }
    },
    getNextCard() {
      console.log("votingRights.length:", this.voteRights.length);
      if (this.voteRights.length > 0) {
        let nextCard = R.last(this.voteRights);
        console.log("nextCard", nextCard);
        this.voteRights = R.dropLast(1, this.voteRights);

        return this.$cardChain.getCard(nextCard.cardId)
          .then(res => {
            console.log("res", res);
            let parsedCard = this.$cardChain.cardObjectToWebModel(res);
            console.log("currentCard", parsedCard);
            if (parsedCard) {
              this.cards.push(parsedCard);
              R.last(this.cards).id = nextCard.cardId;
            } else {
              console.error("card could not be parsed", res);
            }
          });
      } else {
        console.error("no cards left");
      }
    },
    showNextCard() {
      this.votingActive = !R.isEmpty(this.cards);
      this.currentCard = R.last(this.cards);
      this.votePool = new Coin(this.currentCard.votePool).nornalize().pretty();
      this.cards = R.dropLast(1, this.cards);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/variables";

.InfoContainer {
  padding: 2em;
  background-color: $main-color-c;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 25em));
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  width: max-content;
  max-width: 100%;
}

.Info {
  text-align: left;
  width: 15em;
}

.ELement {
  position: relative;
  flex-grow: 1;
  max-width: 25em;
}

.voter {
  min-height: 10vh;
}

.FlavourText {
  font-style: italic;
}

:deep(p) {
  color: black;
}

</style>
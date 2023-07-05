<template>
  <div align="center">
    <div class="voter ccbutton">
      <br>
      <h1>Vote Encounters</h1>
      <p>Vote on cards that you enountered in-game.</p>
      <p>To make your votes take effect, you have to send them to the chain.</p>
      <br>
      <div>
        <div class="InfoContainer">
          <div v-if="status === Status.VOTING" class="ELement Info">
            <h3>{{ currentCard.CardName }}</h3>
            <p v-if="currentCard.FlavourText" class="FlavourText">
              "{{ currentCard.FlavourText }}"
            </p>
            <br>
            <h3>Advanced Card Information</h3>
            <p>
              Votepool: {{ votePool }} <br>
              Status: {{ currentCard.status }} <br>
            </p>
            <br><br>
            <keyword-component :keywords="currentCard.Keywords" />
          </div>
          <div v-if="status === Status.VOTING" class="ELement">
            <CardComponent :model="currentCard" :image-u-r-l="currentCard.image" />
          </div>
          <div v-if="status === Status.NOVOTESLEFT" class="ELement">
            <img style="max-width:25em;" src="@/assets/icon/noCard.png">
            <br><br>
            <p>It seams like you have voted on all cards you've encountered. Come back here, when you've played more
              matches.</p>
          </div>
          <div v-if="status === Status.READY_TO_SEND" class="ELement">
            To make your votes take effect, you have to send them to the chain.
            <button @click="sendToChain()">
              Send votes to chain
            </button>
          </div>
          <div v-if="status === Status.NOTLOGGEDIN" class="ELement">
            <p>You cannot vote on cards. Please login with your wallet.</p>
          </div>
          <div v-if="status === Status.UNREGISTERED">
            <p>You are not registered. To vote on cards you have to register, press the Join button to register.</p>
            <p>Afer registering it might take a few seconds until your account becomes active.</p>
          </div>
        </div>
      </div>

      <br>
      <div v-if="status === Status.VOTING" class="button-container">
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
        <button
          v-if="!isEmpty()"
          style="margin-left: 50px;"
          @click="sendToChain()"
        >
          Send votes to chain
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as R from "ramda";
import CardComponent from "@/components/elements/CardComponent.vue";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Card } from "@/model/Card";
import { useAddress } from "@/def-composables/useAddress";
import { useNotifications } from "@/def-composables/useNotifications";
import { useQuery } from "@/def-composables/useQuery";
import { useTx } from "@/def-composables/useTx";
import { useVoting } from "@/def-composables/useVoting";
import type { CardchainVoteRight } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/rest";

const Status = {
  "VOTING": 0,
  "UNREGISTERED": 1,
  "NOVOTESLEFT": 2,
  "NOTLOGGEDIN": 3,
  "READY_TO_SEND": 4,
}

export default {
  name: "EncounterVotingComponent",
  components: { CardComponent, KeywordComponent },
  data() {
    return {
      status: Status.NOTLOGGEDIN,
      Status: Status,
      voteRights: new Array<CardchainVoteRight>(),
      cards: new Array<Card>(),
      currentCard: new Card(),
      votePool: "",
      config: {
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      }
    };
  },
  setup() {
    const { loggedIn } = useLoggedIn()
    const { address } = useAddress()
    const { queryQCards, queryQCard, queryQVotableCards } = useQuery();
    const { notifyInfo, notifyFail, notifySuccess } = useNotifications()
    const { voteCard } = useTx()
    const { add, send, isEmpty, filterCards } = useVoting()

    return { loggedIn, address, queryQVotableCards, queryQCards, notifyInfo, queryQCard, voteCard, add, send, isEmpty, filterCards, notifyFail, notifySuccess}
  },
  watch: {
    loggedIn() {
      if (this.loggedIn) {
        this.init();
      } else {
        this.status = Status.NOTLOGGEDIN
      }
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.init();
    } else {
      this.notifyInfo("Not logged in", "You must login to be able to vote.");
    }
  },
  methods: {
    init() {
      this.queryQVotableCards(this.address)
        .then(res => {
          let voteRights = this.filterCards(res.voteRights)
          this.queryQCards("playable")
            .then(cards => {
              console.log("getVotableCards:", res);
              if (res.voteRights) {
                this.voteRights = voteRights;

                let cleaned = [];
                for (let i = 0; i < this.voteRights.length; i++) {
                  if (cards.cardsList.includes(this.voteRights[i].cardId)) {
                    cleaned.push(this.voteRights[i]);
                  }
                }

                this.voteRights = cleaned;
                this.status = Status.VOTING

                if (this.voteRights.length > 0) {
                  console.log("voteRights:", this.voteRights);

                  this.getNextCard();
                } else {
                  this.status = Status.NOVOTESLEFT
                }
              } else if (res.unregistered === true) {
                this.status = Status.UNREGISTERED
                this.notifyFail("NOT REGISTERED", "You are not registered in the blockchain. Please register to obtain voting rights.");
              } else if (res.noVoteRights === true) {
                this.status = Status.NOVOTESLEFT
                this.notifyInfo("No Vote Rights", "You do not have any voting rights, therefore you cannot vote on cards.");
              } else if (res.votables === null) {
                if (!this.isEmpty()) {
                  this.status = Status.READY_TO_SEND
                  console.log("ready to send");
                } else {
                  this.status = Status.NOVOTESLEFT
                  console.log("no more voting rights");
                }
              } else {
                this.status = Status.NOVOTESLEFT
                console.error("getVotableCards returned non-readable data: ", res);
              }
            });
        })
        .catch(res => {
          this.notifyFail("OH NOES", res);
        });
    },
    vote(type: string) {
      this.add(this.currentCard.id, type)
      console.log("vote cast for cardid", this.currentCard.id, "voted: ", type);

      if (R.isEmpty(this.cards)) {
        if (!R.isEmpty(this.voteRights)) {
          this.getNextCard()
        } else {
          if (!this.isEmpty()) {
            this.status = Status.READY_TO_SEND
            console.log("ready to send");
          } else {
            this.status = Status.NOVOTESLEFT
            console.log("no more voting rights");
          }
        }
      } else {
        this.showNextCard();
      }
    },
    getNextCard() {
      console.log("votingRights.length:", this.voteRights.length);
      if (this.voteRights.length > 0) {
        let nextCard = this.voteRights.at(-1)!;
        console.log("nextCard", nextCard);
        this.voteRights = R.dropLast(1, this.voteRights);

        this.queryQCard(nextCard.cardId)
          .then((parsedCard: Card) => {
            console.log("currentCard", parsedCard);
            if (parsedCard) {
              this.cards.push(parsedCard);
              this.cards.at(-1)!.id = parseInt(nextCard.cardId!);
            } else {
              console.error("card could not be parsed", parsedCard);
            }
            this.showNextCard()
          });
      } else {
        console.error("no cards left");
      }
    },
    showNextCard() {
      if (R.isEmpty(this.cards)) {
        if (!this.isEmpty()) {
          this.status = Status.READY_TO_SEND
          console.log("ready to send");
          return
        }
        this.status = Status.NOVOTESLEFT
        return
      }
      this.currentCard = this.cards.at(-1)!;
      this.votePool = this.currentCard.votePool.normalize().pretty();
      this.cards = R.dropLast(1, this.cards);
    },
    sendToChain() {
      this.send(_ => {
        this.notifySuccess("Success!", "Voted succesfully!")
        if (this.voteRights.length == 0)
          this.status = Status.NOVOTESLEFT
      }, err => {console.log(err)})
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

  h3 {
    color: black;
  }
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

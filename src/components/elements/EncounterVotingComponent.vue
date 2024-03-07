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
          <div
            v-if="!loggedIn"
            class="ELement"
          >
            <p>You cannot vote on cards. Please login with your wallet.</p>
          </div>
          <div
            v-if="current"
            class="ELement Info"
          >
            <h3>{{ state.currentCard.CardName }}</h3>
            <p
              v-if="state.currentCard.FlavourText"
              class="FlavourText"
            >
              "{{ state.currentCard.FlavourText }}"
            </p>
            <br>
            <h3>Advanced Card Information</h3>
            <p>
              Votepool: {{ votePool }} <br>
              Status: {{ state.currentCard.status }} <br>
            </p>
            <br><br>
            <keyword-component :keywords="state.currentCard.Keywords" />
          </div>
          <div
            v-if="typeof current !== 'undefined'"
            class="ELement"
          >
            <CardComponent
              :model="state.currentCard"
              :image-u-r-l="state.currentCard.image"
            />
          </div>
          <div
            v-if="loggedIn && !cardsLeft.length && isEmpty"
            class="ELement"
          >
            <img
              style="max-width: 25em"
              src="@/assets/icon/noCard.png"
            >
            <br><br>
            <p>
              It seams like you have voted on all cards you've encountered. Come
              back here, when you've played more matches.
            </p>
          </div>
          <div
            v-if="loggedIn && !cardsLeft.length && !isEmpty"
            class="ELement"
          >
            To make your votes take effect, you have to send them to the chain.
            <button @click="sendToChain()">
              Send votes to chain
            </button>
          </div>
        </div>
      </div>

      <br>
      <div
        v-if="cardsLeft.length"
        class="button-container"
      >
        <button @click="vote(VoteType.fairEnough)">
          Fair Enough
        </button>
        <button @click="vote(VoteType.overpowered)">
          Overpowered
        </button>
        <button @click="vote(VoteType.underpowered)">
          Underpowered
        </button>
        <button @click="vote(VoteType.inappropriate)">
          Inappropriate
        </button>
        <button
          v-if="!isEmpty"
          style="margin-left: 50px"
          @click="sendToChain()"
        >
          Send votes to chain
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Card } from "@/model/Card";
import { useAddress } from "@/def-composables/useAddress";
import { useNotifications } from "@/def-composables/useNotifications";
import { useQuery } from "@/def-composables/useQuery";
import { useVoting } from "@/def-composables/useVoting";
import { computed, onMounted, reactive, watch } from "vue";
import { VoteType } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting";
import { useCards } from "@/def-composables/useCards";

const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { queryQCard } = useQuery();
const { notifySuccess } = useNotifications();
const { getCard } = useCards()
const { add, send, isEmpty, cardsLeft, current, next } = useVoting();

const initialState: {
  currentCard: Card;
} = {
  currentCard: new Card(),
};

const state = reactive(initialState);
const votePool = computed(() => state.currentCard.votePool.normalize().pretty())

const vote = (type: VoteType) => add(current.value!, type);

const loadCard = () => {
  if (current.value) {
    getCard(current.value!).then((parsedCard: Card) => {
      if (parsedCard) {
        state.currentCard = parsedCard;
      } else {
        console.error("card could not be parsed", parsedCard);
      }
    });
  }
  if (next.value) {
    getCard(next.value!)
  }
};

onMounted(() => {
  if (loggedIn.value) {
    loadCard();
  }
});

watch(current, loadCard);

const sendToChain = () => {
  send(
    () => {
      notifySuccess("Success!", "Voted succesfully!");
    },
    (err) => {
      console.log(err);
    }
  );
};
</script>

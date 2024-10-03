<template>
  <div class="flex flex-col text-lg bg-cc-yellow">
    <div class="text-center pt-12 pb-6">
      <p class="text-4xl pb-2">
        Council Encounter
      </p>
      <p>Make a decision for the card draft below. <br>
      Another player has designed this card. <br>
      Your review is needed to make it a valid card for ranked play!</p>
    </div>
    <div class="bg-black text-white flex justify-center">
      <div class="p-8">
        <div
          v-if="!loggedIn"
          class="text-center"
        >
          <p class="pb-4">
            To vote on cards you have to <b>login</b> first!
          </p>
          <RouterCCButton :to="{ name: 'Login' }">
            Login
          </RouterCCButton>
        </div>
        <div v-else-if="current">
          <div class="w-64 inline-block align-top mr-12">
            <p>
              <b>{{ state.currentCard.CardName }}</b><br>
              <i v-if="state.currentCard.FlavourText">
                "{{ state.currentCard.FlavourText }}"
              </i>
              <br><br>
              <b>Advanced Card Information</b> <br>
              Votepool: {{ votePool }} <br>
              Status: {{ state.currentCard.status }} <br>
            </p>
            <br>
            <keyword-component :keywords="state.currentCard.Keywords" />
          </div>
          <div class="inline-block">
            <CardComponent
              :model="state.currentCard"
              class="h-[35rem]"
            />
          </div>
        </div>
        <div v-else-if="!cardsLeft.length && !isEmpty">
          <p class="pb-4">
            To make your votes take effect, you have to send them to the chain.
          </p>
          <BaseCCButton @click="sendToChain()">
            Send votes to chain
          </BaseCCButton>
        </div>
      </div>
    </div>
    <div
      v-if="cardsLeft.length"
      class="flex justify-center flex-wrap gap-4 py-12"
    >
      <SmallCCButton
        v-for="(elem, idx) in [
          { text: 'Fair Enough', type: VoteType.fairEnough },
          { text: 'Overpowered', type: VoteType.overpowered },
          { text: 'Underpowered', type: VoteType.underpowered },
          { text: 'Inappropriate', type: VoteType.inappropriate },
        ]"
        :key="idx"
        :type="Color.RED"
        @click="vote(elem.type)"
      >
        {{ elem.text }}
      </SmallCCButton>
      <SmallCCButton
        v-if="!isEmpty"
        :type="Color.RED"
        @click="sendToChain()"
      >
        Send votes to chain
      </SmallCCButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Card } from "@/model/Card";
import { useNotifications } from "@/def-composables/useNotifications";
import { useCouncil } from "@/def-composables/useCouncil";
import { computed, onMounted, reactive, watch } from "vue";
import { VoteType } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting";
import { useCards } from "@/def-composables/useCards";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import SmallCCButton from "@/components/elements/CCButton/SmallCCButton.vue";
import { Color } from "@/components/utils/color";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";

const { loggedIn } = useLoggedIn();
const { notifySuccess } = useNotifications();
const { getCard } = useCards();
const { councilStatus, add, send, isEmpty, cardsLeft, current, next } = useCouncil();

const initialState: {
  currentCard: Card;
} = {
  currentCard: new Card(),
};

const state = reactive(initialState);
const votePool = computed(() =>
  state.currentCard.votePool.normalize().pretty(),
);

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
    getCard(next.value!);
  }
};

onMounted(() => {
  console.log("Council Status:", councilStatus.value)
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
    },
  );
};
</script>

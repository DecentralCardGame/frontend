<template>
  <div align="center">
    <h1 class="header__h2">
      {{ state.card.CardName }}
    </h1>
    <a v-if="state.card.FlavourText" class="FlavourText">"{{ state.card.FlavourText }}"</a>
    <br /><br />
    <div class="Container">
      <!-- Keyword Element -->
      <div class="Element" align="left">
        <h3>Used Keywords</h3>
        <br />
        <keyword-component :keywords="state.card.Keywords" />
      </div>
      <!-- Card Element -->
      <div class="ELement">
        <CardComponent :id="'card'" :model="state.card" :image-u-r-l="state.card.image" />
      </div>
      <!-- Basic Element -->
      <div class="Element" align="left">
        <!-- General -->
        <h3>Advanced Card Information</h3>
        <a>
          Votepool: {{ state.card.votePool.normalize().pretty() }} <br />
          Status: {{ state.card.status }} <br />
          Notes: {{ state.card.notes }} <br />
          Owner:
          <router-link
            v-if="state.card.owner"
            :to="{ name: 'UserView', params: { id: state.card.owner } }"
          >
            {{ state.card.owner }}
          </router-link>
          <br />
          Artist:
          <router-link
            v-if="state.card.artist"
            :to="{ name: 'UserView', params: { id: state.card.artist } }"
          >
            {{ state.card.artist }}
          </router-link> </a
        ><br />
        <br />
        <!-- Voting -->
        <h3>Latest Voting Results</h3>
        <a>
          Inappropriate Votes: {{ state.card.inappropriateVotes }} <br />
          Underpowered Votes: {{ state.card.underpoweredVotes }} <br />
          Overpowered Votes: {{ state.card.overpoweredVotes }} <br />
          Fair Enough Votes: {{ state.card.fairEnoughVotes }} <br />
          Nerflevel: {{ state.card.nerflevel }} <br />
        </a>
        <br />
        <div class="ccbutton">
          <button v-if="canVote" @click="vote(VoteType.underpowered)">
            Vote Underpowered
          </button>
          <button v-if="canVote" @click="vote(VoteType.overpowered)">
            Vote Overpowered
          </button>
          <button
            v-if="canVote"
            class="btn--default"
            @click="vote(VoteType.fairEnough)"
          >
            Vote Fair Enough
          </button>
          <button
            v-if="canVote"
            class="btn--default"
            @click="vote(VoteType.inappropriate)"
          >
            Vote Inappropriate
          </button>
          <br /><br />
          <button v-if="isArtist" class="btn--default" @click="edit()">
            Edit artwork
          </button>
          <button v-if="isOwner" class="btn--default" @click="edit()">
            Edit card
          </button>
          <button v-if="isOwner" class="btn--default" @click="showModal()">
            Transfer card
          </button>
          <TransferCardModal
            v-show="state.isModalVisible"
            :card="String(state.id)"
            @close="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import TransferCardModal from "@/components/modals/TransferCardModal.vue";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { useQuery } from "@/def-composables/useQuery";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Card } from "@/model/Card";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  VoteType
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting";
import { useVoting } from "@/def-composables/useVoting";
import { useCards } from "@/def-composables/useCards";

const { queryQCard } = useQuery();
const { editCard } = useCardCreatorCards();
const { address } = useAddress();
const { loggedIn } = useLoggedIn();
const { add, send, isEmpty, cardsLeft, current } = useVoting();
const { getCard } = useCards()
const route = useRoute();
const router = useRouter()

const initialState: {
  isModalVisible: boolean;
  id: number;
  card: Card;
} = {
  isModalVisible: false,
  id: -1,
  card: new Card(),
};

const state = reactive(initialState);
const canVote = computed(() => cardsLeft.value.includes(state.id))
const isOwner = computed(() => state.card.owner === address.value && loggedIn.value);
const isArtist = computed(() => state.card.artist === address.value && loggedIn.value)

onMounted(() => {
  state.id = parseInt(route.params.id as string);
  if (!isNaN(state.id)) {
    loadCard();
  }
});

const loadCard = async () => {
  state.card = await getCard(state.id)
};
const vote = (type: VoteType) => {
  add(state.id, type);
  send(
    () => {},
    (err) => {
      console.log(err);
    }
  );
  close();
};
const edit = () => {
  state.card.id = state.id;
  editCard.card.value = state.card;
  router.push("/cardCreator");
};
const showModal = () => state.isModalVisible = true
const closeModal = () => {
  state.isModalVisible = false;
  loadCard();
};
</script>
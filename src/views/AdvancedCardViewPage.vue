<template>
  <div class="bg-black text-white flex lg:h-[80vh] p-16 lg:p-8">
    <ModalInner
      :heading="state.card.CardName"
      class="m-auto"
      @close="$router.back()"
    >
      <div
        class="lg:flex justify-center space-y-20 lg:space-y-0 lg:space-x-20 p-6"
      >
        <div>
          <span v-if="state.card.FlavourText">
            <i>"{{ state.card.FlavourText }}"</i>
          </span>
          <CardComponent :model="state.card" :image-u-r-l="state.card.image" />
        </div>
        <div>
          <p class="font-bold text-2xl">Advanced Card Information</p>
          <br />
          <p>
            Votepool: {{ state.card.votePool.normalize().pretty() }} <br />
            Status: {{ state.card.status }} <br />
            Notes: {{ state.card.notes }} <br />
            Owner:
            <CompactAddressComponent :addr="state.card.owner" />
            <br />
            Artist:
            <CompactAddressComponent :addr="state.card.artist" />
          </p>
          <br />
          <p class="font-bold text-2xl">Latest Voting Results</p>
          <p>
            Inappropriate Votes: {{ state.card.inappropriateVotes }} <br />
            Underpowered Votes: {{ state.card.underpoweredVotes }} <br />
            Overpowered Votes: {{ state.card.overpoweredVotes }} <br />
            Fair Enough Votes: {{ state.card.fairEnoughVotes }} <br />
            Nerflevel: {{ state.card.nerflevel }} <br />
          </p>
          <br />
        </div>
        <div>
          <p class="font-bold text-2xl">Used Keywords</p>
          <br />
          <KeywordComponent :keywords="state.card.Keywords" />
        </div>
      </div>
      <div
        class="flex flex-col lg:flex-row justify-center lg:justify-end space-y-6 lg:space-x-6 lg:space-y-0"
      >
        <BaseCCButton :type="ButtonType.RED" v-if="isArtist" @click="edit()">
          Edit artwork
        </BaseCCButton>
        <BaseCCButton :type="ButtonType.RED" v-if="isOwner" @click="edit()">
          Edit card
        </BaseCCButton>
        <BaseCCButton
          v-if="isOwner"
          :type="ButtonType.RED"
          @click="showModal()"
        >
          Transfer card
        </BaseCCButton>
      </div>
    </ModalInner>
  </div>
  <TransferCardModal
    v-show="state.isModalVisible"
    :card="String(state.id)"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import TransferCardModal from "@/components/modals/TransferCardModal.vue";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Card } from "@/model/Card";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VoteType } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting";
import { useVoting } from "@/def-composables/useVoting";
import { useCards } from "@/def-composables/useCards";
import ModalInner from "@/components/elements/ModalInner.vue";
import CompactAddressComponent from "@/components/elements/CompactAddressComponent.vue";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const { editCard } = useCardCreatorCards();
const { address } = useAddress();
const { loggedIn } = useLoggedIn();
const { add, send, isEmpty, cardsLeft, current } = useVoting();
const { getCard } = useCards();
const route = useRoute();
const router = useRouter();

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
const isOwner = computed(
  () => state.card.owner === address.value && loggedIn.value
);
const isArtist = computed(
  () => state.card.artist === address.value && loggedIn.value
);

onMounted(() => {
  state.id = parseInt(route.params.id as string);
  if (!isNaN(state.id)) {
    loadCard();
  }
});

const loadCard = async () => {
  state.card = await getCard(state.id);
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
const showModal = () => (state.isModalVisible = true);
const closeModal = () => {
  state.isModalVisible = false;
  loadCard();
};
</script>

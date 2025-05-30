<template>
  <ModalFrame
    :heading="state.card.CardName"
    class="max-w-[100rem]"
    @close="emit('close')"
  >
    <div
      class="lg:flex justify-center text-white space-y-20 lg:space-y-0 lg:space-x-20 p-6"
    >
      <div>
        <p
          v-if="state.card.FlavourText"
          class="text-center max-w-xs pb-8 mx-auto"
        >
          <i>"{{ state.card.FlavourText }}"</i>
        </p>
        <div>
          <CardComponent
            class="block"
            :model="state.card"
            :image-u-r-l="state.card.image"
          />
        </div>
      </div>

      <div v-show="!state.isTransferModalVisible">
        <p class="font-bold text-2xl">
          Advanced Card Information
        </p>
        <br>
        <p>
          Card id: {{ id }}<br>
          Votepool: {{ state.card.votePool.normalize().pretty() }} <br>
          Status: {{ state.card.status }} <br>
          Notes: {{ state.card.notes }} <br>
          Owner:
          <CompactAddressComponent :addr="state.card.owner" />
          <br>
          Artist:
          <CompactAddressComponent :addr="state.card.artist" />
        </p>
        <br>
        <p class="font-bold text-2xl">
          Latest Voting Results
        </p>
        <p>
          Inappropriate Votes: {{ state.card.inappropriateVotes }} <br>
          Underpowered Votes: {{ state.card.underpoweredVotes }} <br>
          Overpowered Votes: {{ state.card.overpoweredVotes }} <br>
          Fair Enough Votes: {{ state.card.fairEnoughVotes }} <br>
          Nerflevel: {{ state.card.nerflevel }} <br>
        </p>
        <br>
      </div>

      <div v-show="!state.isTransferModalVisible">
        <KeywordComponent :card="state.card" />
      </div>

      <TransferCardModal
        v-show="state.isTransferModalVisible"
        :card="String(props.id)"
        @close="closeModal"
      />


    </div>
    <div
      class="flex flex-col lg:flex-row justify-center lg:justify-end space-y-6 lg:space-x-6 lg:space-y-0"
    >
      <router-link :to="{ path: '/cardview/' + props.id }">
        <BaseCCButton
          :type="Color.RED"
        >
          Card URL
        </BaseCCButton>
      </router-link>
      <BaseCCButton
        v-if="isOwner || isArtist"
        :type="Color.RED"
        @click="edit()"
      >
        Edit card
      </BaseCCButton>
      <BaseCCButton
        v-if="isOwner"
        :type="Color.RED"
        @click="showTransferModal()"
      >
        Transfer card
      </BaseCCButton>
    </div>
  </ModalFrame>
</template>

<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import TransferCardModal from "@/components/modals/TransferCardModal.vue";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Card } from "@/model/Card";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";
import { computed, onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useCards } from "@/def-composables/useCards";
import CompactAddressComponent from "@/components/elements/CompactAddressComponent.vue";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { Color } from "@/components/utils/color";
import ModalFrame from "@/components/modals/ModalFrame.vue";

const { editCard } = useCardCreatorCards();
const { address } = useAddress();
const { loggedIn } = useLoggedIn();
const { getCard } = useCards();
const router = useRouter();
const emit = defineEmits(["close"]);

const initialState: {
  isTransferModalVisible: boolean;
  card: Card;
} = {
  isTransferModalVisible: false,
  card: new Card(),
};

const props = withDefaults(defineProps<{ id: number }>(), { id: -1 });

const state = reactive(initialState);
const isOwner = computed(
  () => state.card.owner === address.value && loggedIn.value,
);
const isArtist = computed(
  () => state.card.artist === address.value && loggedIn.value,
);

const checkAndLoadCard = () => {
  if (props.id != -1) {
    loadCard();
  }
};

onMounted(checkAndLoadCard);

watch(() => props.id, checkAndLoadCard);

const loadCard = async () => {
  state.card = await getCard(props.id)
};

const edit = () => {
  state.card.id = props.id;
  editCard.card.value = state.card;
  router.push("/cardCreator");
};
const showTransferModal = () => {
  state.isTransferModalVisible = true;
  console.log("modal?", state.isTransferModalVisible)
}
const closeModal = () => {
  state.isTransferModalVisible = false;
  loadCard();
};
</script>

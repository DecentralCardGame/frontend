<template>
  <div class="gallery__view">
    <div
      v-for="card in state.cards"
      :key="card.id"
      @click="showGalleryModal(card)"
    >
      <div class="cardContainer" @click="showGalleryModal(card)">
        <div class="cardContainer--element">
          <CardComponent
            :model="card"
            :image-u-r-l="card.image"
            hover-behavior="none"
            class="gallery__view__card"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="button-container button-container--bottom ccbutton">
    <button v-show="state.pageId > 0" @click="prevPage">back</button>
    <button v-show="state.pageId + 1 <= maxPageID" @click="nextPage">
      next
    </button>
  </div>
  <div
    v-if="state.isGalleryModalVisible"
    class="container-modal"
    @click="closeGalleryModal"
  >
    <div class="ability-modal-container">
      <GalleryModal
        :keyword-descriptions="state.keywordDescriptions"
        :model="state.clickedCard"
        :image-u-r-l="state.clickedCard.image"
        @close="closeGalleryModal"
        @cardview="cardview"
        @edit="edit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GalleryModal from "@/components/modals/GalleryModal.vue";
import { computed, reactive, watch } from "vue";
import { useLastInputEvent } from "@/def-composables/useLastInputEvent";
import { useCards } from "@/def-composables/useCards";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { Card } from "@/model/Card";
import CardComponent from "@/components/elements/CardComponent.vue";
import { useCardsRules } from "@/def-composables/useCardRules";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";

const { lastInputEvent } = useLastInputEvent();
const { getCard } = useCards();
const { rules } = useCardsRules();
const { editCard } = useCardCreatorCards();
const router = useRouter();

const props = withDefaults(
  defineProps<{
    allCardIds: Array<number>;
    cardsPerPage: number;
    rarityFilter: string;
    cardCallback: (card: Card) => void
  }>(),
  {
    allCardIds: () => [],
    cardsPerPage: 100,
    rarityFilter: "none",
    cardCallback: () => {}
  }
);

const initialState: {
  clickedCard: Card;
  isGalleryModalVisible: boolean;
  pageId: number;
  cards: Array<Card>;
  leavePageLock: boolean;
  keywordDescriptions: string[][];
} = {
  clickedCard: new Card(),
  isGalleryModalVisible: false,
  pageId: 0,
  cards: [],
  leavePageLock: false,
  keywordDescriptions: [],
};

const state = reactive(initialState);

const cardIdsOnPage = computed(() => {
  let r = props.allCardIds.slice(
    state.pageId * props.cardsPerPage,
    (state.pageId + 1) * props.cardsPerPage
  );
  return r;
});

const maxPageID = computed(() =>
  Math.ceil(props.allCardIds.length / props.cardsPerPage) - 1
);

onBeforeRouteLeave((to, from, next) => {
  if (state.leavePageLock) next(false);
  else next();
});

watch(cardIdsOnPage, (cardIds) => {
  state.cards = [];
  cardIds.forEach(loadCard);
});

watch(lastInputEvent, (event) => {
  if (event.which == 5) {
    state.leavePageLock = true; // Forward Mouse special button
    nextPage();
  } else if (event.which == 4) {
    // Backward Mouse special button
    state.leavePageLock = true;
    prevPage();
  } else {
    state.leavePageLock = false;
  }
});

const edit = () => {
  editCard.card.value = state.clickedCard;
  router.push("cardCreator");
};

const showGalleryModal = (card: Card) => {
  state.clickedCard = card;
  state.isGalleryModalVisible = true;

  state.keywordDescriptions = [];
  const firstLetterToLower = (s: string) => {
    return s[0].toLowerCase() + s.substring(1);
  };
  state.clickedCard.Keywords.forEach((ability) => {
    ability.forEach((keyword) => {
      state.keywordDescriptions.push([
        keyword,
        rules.value.definitions[firstLetterToLower(keyword)].description,
      ]);
    });
  });
};

const loadCard = async (cardId: number) => {
  let card: Card = await getCard(cardId);
  props.cardCallback(card)
  if (card.Content) {
    // TODO remove this "if" once proper rarity search from blockchain side works
    if (card.rarity == props.rarityFilter || props.rarityFilter == "none") {
      state.cards.push(card);
    }
      
  } else if (!card.owner) {
    console.error("card without content and owner: ", card);
  } else {
    console.error("card without content: ", card);
  }
  return card;
};

const nextPage = () => {
  if (state.pageId + 1 <= maxPageID.value) state.pageId += 1;
};

const prevPage = () => {
  if (state.pageId > 0) state.pageId -= 1;
};

const cardview = () => router.push("cardview/" + state.clickedCard.id);

const closeGalleryModal = () => (state.isGalleryModalVisible = false);
</script>
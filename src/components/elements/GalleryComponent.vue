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
    cardCallback: (card: Card) => void
  }>(),
  {
    allCardIds: () => [],
    cardsPerPage: 100,
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
  console.log(r);
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
    state.cards.push(card);
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

<style scoped lang="scss">
@import "@/scss/variables";

.gallery__view {
  margin: 1rem 0;
  text-shadow: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}

.ability-modal-container {
  margin: 5vh auto auto;
  max-width: 800px;
  max-height: 95vh;
  @media (max-width: 480px) {
    margin-top: 0;
    max-height: 300vh;
    height: auto;
  }
  //OLD:
  // position: relative;
  z-index: 3;
}

.cardContainer--element {
  position: relative;
  flex-grow: 1;
  max-width: 350px;
}

.button-container--bottom {
  margin-top: 2rem;
}
</style>

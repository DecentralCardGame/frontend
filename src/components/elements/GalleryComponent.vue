<template>
  <div
    id="galleryWrapper"
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1800px]:grid-cols-5 gap-12"
  >
    <div
      v-for="card in state.cards"
      :key="card.id"
      class="transition duration-500 hover:scale-110 hover:duration-300"
      :class="shadowClass(card)"
      @click="emit('cardClicked', card.id)"
    >
      <div>
        <CardComponent :model="card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import { computed, onBeforeUnmount, onMounted, reactive, watch } from "vue";
import { useCards } from "@/def-composables/useCards";
import { Card } from "@/model/Card";
import CardComponent from "@/components/elements/CardComponent.vue";

const { getCard } = useCards();
const emit = defineEmits(["cardClicked"]);

const props = withDefaults(
  defineProps<{
    allCardIds: Array<number>;
    cardsPerPage?: number;
  }>(),
  {
    allCardIds: () => [],
    cardsPerPage: 100,
  },
);

const initialState: {
  clickedCard: Card;
  cards: { [x: number]: Card };
  cardsOnPage: number;
  cardIdsChanged: boolean;
} = {
  clickedCard: new Card(),
  cards: {},
  cardsOnPage: 0,
  cardIdsChanged: false,
};

const state = reactive(initialState);

const cardIdsOnPage = computed(() => {
  return props.allCardIds.slice(0, state.cardsOnPage);
});


const shadowClass = (card) => {
  let classes = 0
  console.log("CARD" ,card)
  R.forEachObjIndexed(entry => {
    if (entry) classes++;
  }, card.Class)
  console.log(classes)
  if (classes > 1) return {
    'drop-shadow-glowCCYellow': true,
  }
  else {
  return {
    'drop-shadow-glowCCRed': card.Class.Culture,
    'drop-shadow-glowCCBlue': card.Class.Technology,
    'drop-shadow-glowCCGreen': card.Class.Nature,
    'drop-shadow-glowCCPurple': card.Class.Mysticism,
    'text-danger': false
  }
  }
};



onMounted(() => {
  state.cardsOnPage = props.cardsPerPage;
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

watch(cardIdsOnPage, loadCards);

watch(
  () => props.allCardIds,
  () => {
    state.cardIdsChanged = true;
    state.cards = {};
    state.cardsOnPage = props.cardsPerPage;
  },
);

function loadCards(cardIds: number[], oldCardIds: number[]) {
  const changed = state.cardIdsChanged;
  state.cardIdsChanged = false;
  cardIds
    .filter((cardId) => !oldCardIds.includes(cardId) || changed)
    .forEach(loadCard);
}

const onScroll = () => {
  const galleryWrapperElement = document.getElementById("galleryWrapper")!;
  if (
    window.top!.scrollY + window.innerHeight + 200 >=
      galleryWrapperElement.offsetTop + galleryWrapperElement.offsetHeight &&
    state.cardsOnPage < props.allCardIds.length
  ) {
    state.cardsOnPage += 10;
    console.log(state.cardsOnPage);
  }
};

const loadCard = async (cardId: number) => {
  let card: Card = await getCard(cardId);
  if (card.Content) {
    state.cards[props.allCardIds.indexOf(cardId)] = card;
  } else if (!card.owner) {
    console.error("card without content and owner: ", card);
  } else {
    console.error("card without content: ", card);
  }
  return card;
};
</script>

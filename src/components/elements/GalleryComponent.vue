<template>
  <div
    id="galleryWrapper"
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1800px]:grid-cols-5 gap-12 mt-6"
  >
    <div
      v-for="card in state.cards"
      :key="card.id"
      class="transition duration-500 hover:scale-110 hover:duration-300"
      :class="shadowClass(card)"
      @click="emit('cardClicked', card)"
    >
      <div>
        <CardComponent :model="card" />
      </div>
    </div>
  </div>

  <div class="mt-12 flex flex-row justify-center items-center">
    <BaseCCButton
      :type="Color.RED"
      @click="load()"
      :class="{ invisible: !loadButtonVisible }"
    >
      Reckless Card Loading
    </BaseCCButton>
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useCards } from "@/def-composables/useCards";
import { Card } from "@/model/Card";
import CardComponent from "@/components/elements/CardComponent.vue";
import { Color } from "@/components/utils/color";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";

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
  R.forEachObjIndexed(entry => {
    if (entry) classes++;
  }, card.Class)
  if (classes > 1) return {
    'drop-shadow-glowCCYellow': true,
  }
  else return {
    'drop-shadow-glowCCRed': card.Class.Culture,
    'drop-shadow-glowCCBlue': card.Class.Technology,
    'drop-shadow-glowCCGreen': card.Class.Nature,
    'drop-shadow-glowCCPurple': card.Class.Mysticism
    }
};

onMounted(() => {
  state.cardsOnPage = props.cardsPerPage;
});

const loadButtonVisible = ref(true);
let pendingBatches = 0;

const load = () => {
  state.cardsOnPage = Math.min(state.cardsOnPage + 10, props.allCardIds.length);
  loadButtonVisible.value = false;
  window.addEventListener("scroll", onScroll, true);
};

onBeforeUnmount(() => {
  loadButtonVisible.value = true;
  window.removeEventListener("scroll", onScroll, true);
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

async function loadCards(cardIds: number[], oldCardIds: number[]) {
  const changed = state.cardIdsChanged;
  state.cardIdsChanged = false;
  pendingBatches++;
  try {
    await Promise.allSettled(cardIds
      .filter((cardId) => !oldCardIds.includes(cardId) || changed)
      .map(loadCard));
  } finally {
    pendingBatches--;
    await nextTick();
    // A short batch may leave the end visible without another scroll event.
    if (!loadButtonVisible.value) onScroll();
  }
}

const onScroll = () => {
  const galleryWrapperElement = document.getElementById("galleryWrapper");
  let viewportBottom = window.innerHeight;
  // The gallery page scrolls inside its own overflow-y-auto panel.
  for (let parent = galleryWrapperElement?.parentElement; parent; parent = parent.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(parent).overflowY)) {
      viewportBottom = Math.min(viewportBottom, parent.getBoundingClientRect().bottom);
      break;
    }
  }
  if (
    !loadButtonVisible.value && pendingBatches === 0 && galleryWrapperElement &&
    galleryWrapperElement.getBoundingClientRect().bottom <= viewportBottom + 200 &&
    state.cardsOnPage < props.allCardIds.length
  ) {
    state.cardsOnPage = Math.min(state.cardsOnPage + 10, props.allCardIds.length);
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

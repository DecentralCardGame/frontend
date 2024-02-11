<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16"
    id="galleryWrapper"
  >
    <div
      v-for="card in state.cards"
      :key="card.id"
      class="hover:scale-105 drop-shadow-glowCCYellow"
      @click="router.push({ name: 'CardView', params: { id: card.id } })"
    >
      <div>
        <CardComponent :model="card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, watch } from "vue";
import { useCards } from "@/def-composables/useCards";
import { useRouter } from "vue-router";
import { Card } from "@/model/Card";
import CardComponent from "@/components/elements/CardComponent.vue";
import { useCardsRules } from "@/def-composables/useCardRules";

const { getCard } = useCards();
const { rules } = useCardsRules();
const router = useRouter();

const props = withDefaults(
  defineProps<{
    allCardIds: Array<number>;
    cardsPerPage: number;
    cardCallback: (card: Card) => void;
  }>(),
  {
    allCardIds: () => [],
    cardsPerPage: 100,
    cardCallback: () => {},
  }
);

const initialState: {
  clickedCard: Card;
  cards: { [x: number]: Card };
  cardsOnPage: number;
} = {
  clickedCard: new Card(),
  cards: [],
  cardsOnPage: 0,
};

const state = reactive(initialState);

const cardIdsOnPage = computed(() => {
  return props.allCardIds.slice(0, state.cardsOnPage);
});

onMounted(() => {
  state.cardsOnPage = props.cardsPerPage;
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

watch(cardIdsOnPage, (cardIds, oldCardIds) =>
  cardIds.filter((cardId) => !oldCardIds.includes(cardId)).forEach(loadCard)
);

watch(
  () => props.allCardIds,
  () => {
    state.cards = {};
    state.cardsOnPage = props.cardsPerPage;
  }
);

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
  props.cardCallback(card);
  if (card.Content) {
    state.cards[cardId] = card;
  } else if (!card.owner) {
    console.error("card without content and owner: ", card);
  } else {
    console.error("card without content: ", card);
  }
  return card;
};
</script>

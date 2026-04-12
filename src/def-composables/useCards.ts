import { useQuery } from "@/def-composables/useQuery";
import type { Card } from "@/model/Card";
import { ref, type Ref } from "vue";

const { queryCard } = useQuery();

const state: Ref<{ [key: number]: Card }> = ref({});

const updateCard = async (id: number) => {
  const card: Card = await queryCard(id);
  card.id = id;
  state.value[id] = card;
  return card;
};

const getCard = (id: number) => {
  if (Object.keys(state.value).includes("" + id)) {
    return Promise.resolve(state.value[id]);
  }
  return updateCard(id);
};

export const useCards = () => {
  return { getCard, updateCard };
};

import cardRules from "@/def-composables/cardRules.json";
import { ref } from "vue";
import { resolveCardRules } from "./resolveCardRules";

const useCardRulesInstance = () => {
  const rules = ref(resolveCardRules(cardRules));

  return { rules };
};

let instance: ReturnType<typeof useCardRulesInstance>;

export const useCardsRules = () => {
  if (!instance) {
    instance = useCardRulesInstance();
  }
  return instance;
};
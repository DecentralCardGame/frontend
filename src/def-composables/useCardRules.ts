import cardRules from "@/def-composables/cardRules.json";
import { ref, type Ref } from "vue";
import { Resolver } from "@stoplight/json-ref-resolver";
import * as R from "ramda";

const useCardRulesInstance = () => {
  const resolver = new Resolver();
  let rules: Ref = ref();
  resolver.resolve(cardRules).then(schema => {
    rules.value = schema.result;
    console.log("loaded definitions", schema.result.definitions);
  }).catch(err => {
    console.error(err);
  })

  return { rules };
};

let instance: ReturnType<typeof useCardRulesInstance>;

export const useCardsRules = () => {
  if (!instance) {
    instance = useCardRulesInstance();
  }
  return instance;
};
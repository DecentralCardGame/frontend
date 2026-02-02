<template>
  <div v-if="state.keywordDescriptions.length > 1">
    <p class="font-bold text-2xl">Used Keywords</p>
    <br />
    <div v-for="(keyword, index) in state.keywordDescriptions" :key="index" class="Keywords">
      <p class="font-bold"></p>
      <p>{{ keyword[1] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import { useCardsRules } from "@/def-composables/useCardRules";
import { onMounted, reactive, watch } from "vue";
import { Card } from "@/model/Card";

const { rules } = useCardsRules();

const props = withDefaults(
  defineProps<{
    card: Card;
  }>(),
  {
    card: new Card(),
  }
);

const initialState: {
  keywordDescriptions: Array<Array<string>>;
} = {
  keywordDescriptions: new Array<Array<string>>(),
};

const state = reactive(initialState);

const init = () => {
  const decapital = (x) => {
    return R.join("", R.over(R.lensIndex(0), R.toLower, x));
  };
  const getInteractionText = (key) =>
    R.split(" ", rules.value.definitions[decapital(key)].interactionText);

  const card = props.card;
  let keywords = [];
  if (card.AdditionalCost && !R.isEmpty(card.AdditionalCost)) {
    const costType = R.keys(card.AdditionalCost)[0];
    state.keywordDescriptions = [costType, rules.value.definitions[costType].description];
  }
  if (card.Abilities) {
    card.Abilities.forEach((ability) => {
      const keyword = R.keys(ability)[0];
      keywords.push(keyword);
      const abilityText = getInteractionText(keyword);
      abilityText.forEach((block, index) => {
        if (R.includes("§Effects", block)) {
          ability[keyword].Effects.forEach((effect) => {
            keywords.push(R.keys(effect)[0]);
          });
        }
      });
    });
  }
  if (card.Effects) {
    card.Effects.forEach((effect) => {
      const effectKeyword = R.keys(effect)[0];
      keywords.push(effectKeyword);
    });
  }
  keywords = R.uniq(R.flatten(keywords));

  state.keywordDescriptions = R.prepend(
    state.keywordDescriptions,
    R.map((keyword) => [keyword, rules.value.definitions[decapital(keyword)].description], keywords)
  );
};

watch(props, init);

onMounted(init);
</script>

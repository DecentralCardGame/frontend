<template>
  <div>
    <div
      v-for="(keyword, index) in state.keywordDescriptions"
      :key="index"
      class="Keywords"
    >
      <p class="Keyword">
        {{ keyword[0] }}
      </p>
      <p>{{ keyword[1] }}</p>
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import { useCardsRules } from "@/def-composables/useCardRules";
import { onMounted, reactive, watch } from "vue";

const { rules } = useCardsRules();

const props = withDefaults(
  defineProps<{
    keywords: Array<string>;
  }>(),
  {
    keywords: () => [],
  }
);

const initialState: {
  keywordDescriptions: Array<Array<string>>;
} = {
  keywordDescriptions: new Array<Array<string>>(),
};

const state = reactive(initialState);

const init = () => {
  state.keywordDescriptions = R.map(
    (keyword) => [
      keyword,
      rules.value.definitions[firstLetterToLower(keyword as String)]
        .description,
    ],
    R.uniq(R.flatten(props.keywords))
  );
};

const firstLetterToLower = (string: String) => {
  return string[0].toLowerCase() + string.substring(1);
};

watch(props, init);

onMounted(init);
</script>

<style>
.Keyword {
  font-weight: bold;
}
</style>

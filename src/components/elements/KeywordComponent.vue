<template>
  <div>
    <div
      v-for="(keyword, index) in keywordDescriptions"
      :key="index"
      class="Keywords"
    >
      <p
        class="Keyword"
      >
        {{ keyword[0] }}
      </p>
      <p>{{ keyword[1] }}</p>
      <br>
    </div>
  </div>
</template>

<script>
import * as R from "ramda";
import { useCardsRules } from "@/def-composables/useCardRules";

export default {
  name: "KeywordComponent",
  props: {
    keywords: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      keywordDescriptions: []
    };
  },
  watch: {
    keywords: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  setup() {
    const { rules } = useCardsRules()

    return { cardRules: rules }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.keywordDescriptions = R.map(
        keyword => [keyword, this.cardRules.definitions[this.firstLetterToLower(keyword)].description],
        R.uniq(R.flatten(this.keywords))
      )
    },
    firstLetterToLower(string) {
      return string[0].toLowerCase() + string.substring(1);
    },
  }
};
</script>

<style>
.Keyword {
  font-weight: bold;
}
</style>


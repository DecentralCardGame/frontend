<template>
  <div>
    <h3>{{ currentCard.CardName }}</h3>
    <p
      v-if="currentCard.FlavourText"
      class="FlavourText"
    >
      "{{ currentCard.FlavourText }}"
    </p>
    <br>
    <h3>Advanced Card Information</h3>
    <p>
      Votepool: {{ votePool }} <br>
      Status: {{ currentCard.status }} <br>
    </p>
    <br><br>
    <keyword-component
      :keywords="currentCard.Keywords"
    />
  </div>
</template>

<script>

import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { Coin } from "@/utils/coins";

export default {
  name: "InfoComponent",
  components: { KeywordComponent },
  props: {
    currentCard: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      votePool: ""
    };
  },
  watch: {
    currentCard: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.votePool = new Coin(this.currentCard.votePool).nornalize().pretty();
    }
  }
};
</script>

<style scoped lang="scss">
.FlavourText {
  font-style: italic;
}
</style>


<template>
  <div>
    <h3>{{ card.CardName }}</h3>
    <p
      v-if="card.FlavourText"
      class="FlavourText"
    >
      "{{ card.FlavourText }}"
    </p>
    <br>
    <h3>Advanced Card Information</h3>
    <p>
      Votepool: {{ card.votePool.normalize().pretty() }} <br>
      Status: {{ card.status }} <br>
    </p>
    <br><br>
    <keyword-component
      :keywords="card.Keywords"
    />
  </div>
</template>

<script>

import KeywordComponent from "@/components/elements/KeywordComponent.vue";
import { Card } from "@/model/Card";

export default {
  name: "InfoComponent",
  components: { KeywordComponent },
  props: {
    card: {
      type: Card,
      default() {
        return new Card();
      }
    }
  },
};
</script>

<style scoped lang="scss">
.FlavourText {
  font-style: italic;
}
</style>


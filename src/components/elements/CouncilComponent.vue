<template>
  <div align="center">
    <div class="InfoContainer">
      <div
        v-if="status === Status.VOTING"
        class="ELement Info"
      >
        <h3>{{ card.CardName }}</h3>
        <p
          v-if="currentCard.FlavourText"
          class="FlavourText"
        >
          "{{ card.FlavourText }}"
        </p>
        <br>
        <h3>Advanced Card Information</h3>
        <p>
          Votepool: {{ votePool }} <br>
          Status: {{ card.status }} <br>
        </p>
        <br><br>
        <keyword-component
          :keywords="card.Keywords"
        />
      </div>
      <div
        v-if="status === Status.VOTING"
        class="ELement"
      >
        <CardComponent
          :model="card"
          :image-u-r-l="card.image"
        />
      </div>
      <div
        v-if="status === Status.NOVOTESLEFT"
        class="ELement"
      >
        <img
          style="max-width:25em;"
          src="@/assets/icon/noCard.png"
        >
        <br><br>
        <p>
          It seams like you have voted on all cards you've encountered. Come back here, when you've played more matches.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Coin } from "@/utils/coins";
import CardComponent from "@/components/elements/CardComponent";
import KeywordComponent from "@/components/elements/KeywordComponent.vue";

export default {
  name: "CouncilComponent",
  components: { CardComponent, KeywordComponent },
  props: {
    councilId: {
      type: Number,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      council: {},
      card: {},
    };
  },
  watch: {
    councilId: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.councilId != null) {
      this.$cardChain.getCouncil(this.councilId)
        .then(res => {
          this.council = res;
          this.$cardChain.getCard(this.council.cardId)
          .then(res => {
            this.card = res
          })
        });
      }
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/variables";

.InfoContainer {
  padding: 2em;
  background-color: $main-color-c;
  display: grid;
  box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 0 $minor-color-c;
  grid-template-columns: repeat(auto-fit, minmax(15em, 25em));
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  width: max-content;
  max-width: 100%;
}

.Info {
  text-align: left;
  width: 15em;

  h3 {
    color: black;
  }
}

.ELement {
  position: relative;
  flex-grow: 1;
  max-width: 25em;
}

.voter {
  min-height: 10vh;
}

.FlavourText {
  font-style: italic;
}

:deep(p) {
  color: black;
}

</style>
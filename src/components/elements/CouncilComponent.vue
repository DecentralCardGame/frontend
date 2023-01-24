<template>
  <div align="center">
    <div class="InfoContainer">
      <info-component
        v-if="councilId != null"
        class="ELement Info"
        :current-card="card"
      />
      <div
        v-if="councilId != null"
        class="ELement"
      >
        <CardComponent
          :model="card"
          :image-u-r-l="card.image"
        />
      </div>
      <div
        v-if="councilId == null"
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
import CardComponent from "@/components/elements/CardComponent";
import InfoComponent from "@/components/elements/VotingComponents/InfoComponent.vue";
import { Council } from "@/model/Council";
import { Card } from "@/model/Card";

export default {
  name: "CouncilComponent",
  components: { InfoComponent, CardComponent },
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
      council: new Council(),
      card: new Card(),
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
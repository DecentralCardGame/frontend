<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
      >
        <header
          id="modalTitle"
          class="modal__header"
        >
          <slot name="header">
            Card Info & Interactions
            <button
              aria-label="Close modal"
              class="btn--close"
              type="button"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>

        <div class="container-flex-row">

          <div>
            <CardComponent
              :model="model"
              :image-u-r-l="imageURL"
              hoverBehavior="none"
            />
          </div>

          <div class="container-flex-column">
            <div v-show="keywordDescriptions.length" class="modal__body">
                <b>Keyword Explanations:</b>
                  <div class="container-flex-row"
                    v-for="(keyword, index) in keywordDescriptions"
                    :key="index">
                    <b> {{ keyword[0] }}</b>
                     - {{ keyword[1] }}
                  </div>
            </div>

            <div class="modal__body no__bottomline">
              <b>Card Interactions:</b>
            </div>

            <section
              id="modalDescription"
              class="modal__body choice-grid"
            >
              <button
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="cardview(); close();"
              >
                Advanced Card Info
              </button>
              <button
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="download(); close();"
              >
                Download PNG
              </button>
              <button
                v-if="isOwner"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="edit(); close();"
              >
                Edit Card
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteUP(); close();"
              >
                Vote Underpowered
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteOP(); close();"
              >
                Vote Overpowered
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteFair(); close();"
              >
                Vote Fair Enough
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteInappropriate(); close();"
              >
                Vote Inappropriate
              </button>
            </section>

          </div>

        </div>

        <footer class="modal__footer" />
      </div>
    </div>
  </transition>
</template>
<script>
import CardComponent from "@/components/elements/CardComponent";

export default {
  name: 'GalleryModal',
  components: { CardComponent },
  props: {
    canVote: Boolean,
    isOwner: Boolean,
    keywordDescriptions: Array,
    model: Object,
    imageURL: String
  },
  data() {
    return {
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1,
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    download() {
      this.$emit('download')
    },
    cardview() {
      this.$emit('cardview')
    },
    edit() {
      this.$emit('edit')
    },
    voteOP() {
      this.$emit('voteOP')
    },
    voteUP() {
      this.$emit('voteUP')
    },
    voteFair() {
      this.$emit('voteFair')
    },
    voteInappropriate() {
      this.$emit('voteInappropriate')
    },
  },
  watch: {
    "$store.state.lastInputEvent": function () {
      let event = this.$store.state.lastInputEvent;

      if (event.which == 27) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="scss">
@import "modal";

.container-flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem;
  white-space: pre-wrap;
}

.container-flex-column {
  display: flex;
  flex-direction: column;
}

.keywordTable {
  border-collapse: separate;
  border-spacing: 10px;
  color: $black;
}

.no__bottomline {
  border-bottom: initial;
}
</style>


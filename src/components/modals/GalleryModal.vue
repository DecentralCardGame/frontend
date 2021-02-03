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
            Card Interactions
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
        <section
          id="modalDescription"
          class="modal__body choice-grid"
        >
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
            @click="voteOP(); close();"
          >
            Vote Overpowered
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
        <footer class="modal__footer" />
      </div>
    </div>
  </transition>
</template>
<script>

export default {
  name: 'GalleryModal',
  props: {
    canVote: Boolean,
    isOwner: Boolean
  },
  data() {
    return {
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1
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
  }
}
</script>

<style lang="scss">
@import "modal";
</style>


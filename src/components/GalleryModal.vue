<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header"
        >
          <slot name="header">
            Card Interactions
            <button
              type="button"
              class="btn-close"
              aria-label="Close modal"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>
        <section
          id="modalDescription"
          class="modal-body choice-grid"
        >
          <button
            type="button"
            class="choice-grid-button"
            aria-label="Close modal"
            @click="download(); close();"
          >
            Download PNG
          </button>

          <button v-if="isOwner"
            type="button"
                  class="choice-grid-button"
            aria-label="Close modal"
            @click="edit(); close();"
          >
            Edit Card
          </button>

          <button v-if="canVote"
            type="button"
                  class="choice-grid-button"
            aria-label="Close modal"
            @click="voteOP(); close();"
          >
            Vote Overpowered
          </button>

          <button v-if="canVote"
            type="button"
                  class="choice-grid-button"
            aria-label="Close modal"
            @click="voteUP(); close();"
          >
            Vote Underpowered
          </button>

          <button v-if="canVote"
            type="button"
                  class="choice-grid-button"
            aria-label="Close modal"
            @click="voteFair(); close();"
          >
            Vote Fair Enough
          </button>

          <button v-if="canVote"
            type="button"
                  class="choice-grid-button"
            aria-label="Close modal"
            @click="voteInappropriate(); close();"
          >
            Vote Inappropriate
          </button>
        </section>
        <footer class="modal-footer">

        </footer>
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
  data () {
    return {
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.$emit('close')
    },
    download () {
      this.$emit('download')
    },
    edit () {
      this.$emit('edit')
    },
    voteOP () {
      this.$emit('voteOP')
    },
    voteUP () {
      this.$emit('voteUP')
    },
    voteFair () {
      this.$emit('voteFair')
    },
    voteInappropriate () {
      this.$emit('voteInappropriate')
    },
  }
}
</script>

<style lang="scss">
@import "../assets/styles/variables";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: $white;
  text-shadow: none;
  box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 0 rgba(0, 0, 0, 0.25);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    height: 100vh;
  }
}

.modal-header,
.modal-footer {
  padding: $font-size;
  display: flex;
}

.modal-header {
  border-bottom: $border-thickness solid $red;
  font-weight: bold;
  color: $red;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: ($font-size / 2);
  border-bottom: $border-thickness solid $red;
}

.btn-close {
  border: none;
  font-size: $font-size;
  padding: $font-size / 4;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.btn-green {
  background-color: transparent;
  border: none;
  color: $black;
  transition: all $animation-duration ease-out;

  &:after {
    z-index: -1;
    background: linear-gradient(to right, #4AAE9B 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
  }

  &:hover {
    color: $white;

    &:after {
      background-position: left bottom;
    }
  }
}

.btn-teal {
  background-color: transparent;
  border: none;
  color: $black;
  transition: all $animation-duration ease-out;

  &:after {
    z-index: -1;
    background: linear-gradient(to right, #12D1D1 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
  }

  &:hover {
    color: $white;

    &:after {
      background-position: left bottom;
    }
  }
}

.choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.choice-grid-button {
  margin: 0;
  width: 100%;
  &:after {
    margin: 0;
    z-index: -1;
    background: linear-gradient(to right, $red 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all $animation-duration ease-out;
    content: '';
    display: block;
    position: absolute;
    transform: skewX(0);
    box-shadow: none;
  }
  &:hover {
    color: $white;
    &:after {
      background-position: left bottom;
    }
  }
}
</style>


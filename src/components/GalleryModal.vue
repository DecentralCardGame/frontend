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
          class="modal-body"
        >
          <button
            type="button"
            class="btn-teal"
            aria-label="Close modal"
            @click="download(); close();"
          >
            Download PNG
          </button> <br>

          <button v-if="isOwner"
            type="button"
            class="btn-teal"
            aria-label="Close modal"
            @click="edit(); close();"
          >
            Edit Card
          </button> <br>

          <button v-if="canVote"
            type="button"
            class="btn-teal"
            aria-label="Close modal"
            @click="voteOP(); close();"
          >
            Vote Overpowered
          </button> <br>

          <button v-if="canVote"
            type="button"
            class="btn-teal"
            aria-label="Close modal"
            @click="voteUP(); close();"
          >
            Vote Underpowered
          </button> <br>

          <button v-if="canVote"
            type="button"
            class="btn-teal"
            aria-label="Close modal"
            @click="voteFair(); close();"
          >
            Vote Fair Enough
          </button> <br>

          <button v-if="canVote"
            type="button"
            class="btn-teal"
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

<style>
  ::-webkit-input-placeholder { /* Edge */
    color: red;
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: red;
  }

  ::placeholder {
    color: red;
  }
  .input {
    color: black
  }

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
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #12D1D1;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #12D1D1;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .btn-teal {
    color: white;
    background: #12D1D1;
    border: 1px solid #12D1D1;
    border-radius: 2px;
  }
</style>

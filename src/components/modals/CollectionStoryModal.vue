<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1001;"
    >
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
        @click.stop="doNothing"
      >
        <header
          id="modalTitle"
          class="modal__header"
        >
          <slot name="header">
            Edit story
          </slot>
          <button
            aria-label="Close modal"
            type="button"
            class="btn--close"
            @click="close"
          >
            x
          </button>
        </header>
        <div class="modal__body input--transfer">
          <textarea
            v-model="story"
            placeholder="story"
            rows="10"
            cols="40"
          />
          <button
            class="btn--default"
            @click="send"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'CollectionStoryModal',
  props: {
    id: {
      type: Number,
      default: 0
    },
    inpStory: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      story: "",
    }
  },
  created() {
  },
  mounted() {
    this.story = this.inpStory
  },
  methods: {
    close() {
      this.$emit('close')
    },
    send() {
      this.$cardChain.addStoryToCollection(
        this.id,
        this.story,
      ).then(res => {
        console.log("yees")
        this.close()
      })
    }
  }
}

</script>

<style lang="scss">
@import "modal";

.input--transfer {
  input {
    padding: 0;
    margin-right: 2px;
    display: inline;
    color: $black;
    text-align: right;
    background-color: lightgray;
  }
}

</style>

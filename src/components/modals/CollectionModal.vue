<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1000;"
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
            Create Collection
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
        <div
          class="modal__body input--createCollection"
          align="center"
        >
          The Collections name:<br>
          <input
            v-model="name"
            type="text"
            placeholder="name"
          >
          <br>The artist, who will upload the collections artwork:<br>
          <input
            v-model="artist"
            type="text"
            placeholder="artist"
          >
          <br>Story writer, who will add the collections story:<br>
          <input
            v-model="storyWriter"
            type="text"
            placeholder="storyWriter"
          >
          <br>Contributors that are able to add cards to the collection:<br>
          <div
            v-for="(contrib, idx) in contributors"
            :key="contrib"
          >
            {{ contrib }}
            <button
              class="btn--default"
              @click="contributors.splice(idx, 1)"
            >
              -
            </button>
          </div>
          <input
            v-model="tempContrib"
            type="text"
            placeholder=""
          >
          <button
            class="btn--default"
            @click="if (tempContrib) {contributors.push(tempContrib); tempContrib=''}"
          >
            +
          </button>
          <br>
          <a
            v-show="warningText"
            class="warning"
          >
            {{ warningText }}
          </a>
          <br>
          <button
            class="btn--default"
            @click="send"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import {atPath, createInteraction, filterSelection, icon, updateInteraction} from '../utils/utils.js'

export default {
  name: 'CollectionModal',
  props: {
  },
  data() {
    return {
      name: "",
      artist: "",
      storyWriter: "",
      contributors: [],
      tempContrib: "",
      warningText: "",
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    send() {
      if (!(this.name && this.artist && this.storyWriter)) {
        this.warningText = "Name, artist and story writer have to be present"
        return
      }
      var arr = [this.artist, this.storyWriter].concat(this.contributors)
      console.log(arr)
      for (var i = 0; i < arr.length; i++) {
        if (! this.$cardChain.validAddress(arr[i])) {
          this.warningText = arr[i] + " is not a proper address!"
          return
        }
      }
      this.$cardChain.createCollection(
        this.name,
        this.artist,
        this.storywriter,
        this.contributors
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

.input--createCollection {
  input {
    padding: 0;
    margin-right: 2px;
    display: inline;
    color: $black;
    text-align: right;
    background-color: lightgray;
  }
}

.warning {
  color: red;
}

</style>

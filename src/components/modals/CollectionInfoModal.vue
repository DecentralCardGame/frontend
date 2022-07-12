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
            Collection: {{ collection.name }}
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
          class="modal__body input--editCollection"
          align="center"
        >
          <img
            :src="getImage()"
          ><br>
          Story:
          {{ collection.story }}<br>
          Contributors:
          <router-link
            v-for="contrib in collection.contributors"
            :key="contrib"
            :to="{name: 'UserView', params: {id: contrib} }"
          >
            <a>{{ contrib }}</a><br>
          </router-link>
          Story writer:
          <router-link
            :to="{name: 'UserView', params: {id: collection.storyWriter} }"
          >
            <a>{{ collection.storyWriter }}</a>
          </router-link><br>
          Artist:
          <router-link
            :to="{name: 'UserView', params: {id: collection.artist}}"
          >
            <a>{{ collection.artist }}</a>
          </router-link><br>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import {atPath, createInteraction, filterSelection, icon, updateInteraction} from '../utils/utils.js'

export default {
  name: 'CollectionInfoModal',
  props: {
    id: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      collection: {
        name: "",
        artist: " ",
        storyWriter: " ",
        contributors: [],
      }
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
    }
  },
  created() {
  },
  mounted() {
    this.$cardChain.getCollection(this.id)
    .then(res => {
      this.collection = res.c
      console.log(this.collection)
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getImage() {
      if (this.collection.image) {
        return this.collection.image
      } else {
        return "Avatar0.png"
      }
    }
  }
}

</script>

<style lang="scss">
@import "modal";

.input--editCollection {
  color: $black;
  input {
    color: $black;
    padding: 0;
    margin-right: 2px;
    display: inline;
    text-align: right;
    background-color: lightgray;
  }
  a {
    color: $black;
  }
  img {
    border-radius: 10px;
    width: 200px;
  }
}


</style>

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
            Airdrops
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
          Claimable airdrops:
          <div
            v-for="(drop, name) in airdrops"
            v-show="!drop || true"
            :key="name"
            class="airdropBox"
          >
            {{ data[name].text }}
            <router-link
              :to="{name: data[name].linkData}"
            >
              {{ data[name].linkText }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'

export default {
  name: 'AirdropsModal',
  props: {
    airdrops: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      data: {
        create: {
          text: "Create a ",
          linkText: "card draft.",
          linkData: 'New Card'
        },
        vote: {
          text: "Vote for a ",
          linkText: "card.",
          linkData: 'Vote'
        },
        play: {
          text: "Play the game.",
          linkText: "",
          linkData: ''
        },
        user: {
          text: "Create a user",
          linkText: "",
          linkData: ''
        },
        buy: {
          text: "Buy a",
          linkText: "boosterpack",
          linkData: '' // TODO: Needs
        },
      }
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
  select {
    color: $black;
    background-color: lightgray;
    display: inline;
  }
}

.airdropBox {
  margin: 5px;
  padding: 7px;
  position: relative;
  box-shadow: 2px 2px 4px;
  text-align: left;
  cursor: pointer;
  a {
    color: $black;
    font-weight: bold;
  }
  button {
    left: 80%;
    top: 0%;
    position: absolute;
    margin-left: 2px;
    color: red;
  }
}

.airdropBox:hover {
  box-shadow: 4px 4px 8px;
}

</style>

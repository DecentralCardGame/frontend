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
            Transfer coins
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
          Grant action
          <select v-model="grant">
            <option
              v-for="option in options"
              :key="option"
              :value="option[1]"
            >
              {{ option[0] }}
            </option>
          </select>
          to
          <input
            v-model="grantee"
            type="text"
            placeholder="'grantee'"
          >
          <button
            class="btn--default"
            @click="send"
          >
            Send
          </button>
          <a
            v-show="warningText"
            class="warning"
          >
            <br>{{ warningText }}
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import {atPath, createInteraction, filterSelection, icon, updateInteraction} from '../utils/utils.js'

export default {
  name: 'GrantModal',
  props: {
  },
  data() {
    return {
      options: [["vote", "/DecentralCardGame.cardchain.cardchain.MsgVoteCard"]],
      grant: "",
      grantee: "",
      warningText: "",
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
      this.init()
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$store.getters["getLoggedIn"]) {
        this.address = this.$store.getters['common/wallet/address']
        // this.getCoins()
      }
    },
    // getCoins() {
    //   this.$cardChain.getAccInfo(this.address)
    //   .then(coins => {
    //     this.coins = coins.coins
    //     console.log("Hier")
    //   })
    // },
    close() {
      this.$emit('close')
    },
    send() {
      if (! this.grant) {
        this.warningText = "Choose an action!"
        return
      }
      if (! this.$cardChain.validAddress(this.grantee)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.warningText = ""
      this.$cardChain.grantAuthz(this.grantee, this.grant).then(res => {
        console.log("yees")
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
  select {
    color: $black;
    background-color: lightgray;
    display: inline;
  }
}

.warning {
  color: red;
}
</style>

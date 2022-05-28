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
          Transfer
          <input
            v-model="amount"
            type="text"
            placeholder="amount"
            @keypress="isNumber($event)"
          >
          <select v-model="denom">
            <option
              v-for="coin in coins"
              :key="coin"
            >
              {{ coin.denom }}
            </option>
          </select>
          to
          <input
            v-model="recipient"
            type="text"
            placeholder="'recipient'"
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
  name: 'TransferModal',
  props: {
  },
  data() {
    return {
      amount: 0,
      denom: "",
      coins: [],
      recipient: "",
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
        this.getCoins()
      }
    },
    getCoins() {
      this.$cardChain.getAccInfo(this.address)
      .then(coins => {
        this.coins = coins.coins
        console.log("Hier")
      })
    },
    close() {
      this.$emit('close')
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    send() {
      if (! this.amount) {
        this.warningText = "Input an amount!"
        return
      }
      if (! this.denom) {
        this.warningText = "Choose a denom!"
        return
      }
      for (var i = 0; i < this.coins.length; i++) {
        if ((this.coins[i].denom == this.denom) && (Number(this.amount) > this.coins[i].amount)) {
          this.warningText = "You don't have that many coins!"
          return
        }
      }
      if (! this.$cardChain.validAddress(this.recipient)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.warningText = ""
      this.$cardChain.transferCoin(
        this.recipient,
        [
          {
            amount: this.amount,
            denom: this.denom
          }
        ]
      ).then(res => {
        console.log("yees")
        this.amount = 0
        this.denom = ""
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

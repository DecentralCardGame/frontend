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
              v-for="coin, i in coins"
              :key="i"
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

<script lang=ts>
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useQuery } from "@/def-composables/useQuery";
import { useAddress } from "@/def-composables/useAddress";
import { validAddress } from "@/utils/validation";
import { useTx } from "@/def-composables/useTx";
import { errorMonitor } from "events";
import { Coin } from "@/model/Coin";

const { queryAllBalances } = useQuery()
const { send } = useTx()

export default {
  name: 'TransferModal',
  props: {
  },
  data() {
    return {
      amount: 0,
      denom: "",
      coins: new Array<Coin>(),
      recipient: "",
      warningText: "",
    }
  },
  watch: {
    loggedIn() {
      this.init()
    }
  },
  setup() {
    const { loggedIn } = useLoggedIn()
    const { address } = useAddress()

    return { loggedIn, address }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.loggedIn) {
        this.getCoins()
      }
    },
    getCoins() {
      queryAllBalances(this.address)
      .then(res => {
        this.coins = res.balances
      })
    },
    close() {
      this.$emit('close')
    },
    isNumber: function (evt: any) {
      evt = evt || window.event
      let charCode = (evt.which) ? evt.which : evt.keyCode
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
      for (let i = 0; i < this.coins.length; i++) {
        if ((this.coins[i].denom == this.denom) && (Number(this.amount) > this.coins[i].amount)) {
          this.warningText = "You don't have that many coins!"
          return
        }
      }
      if (!validAddress(this.recipient)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.warningText = ""
      send(
        [
          new Coin(
            this.denom,
            this.amount
          ).toCompatCoin()
        ],
        this.recipient,
        _ => {
          this.amount = 0
          this.denom = ""
        },
        err => {
          console.error(errorMonitor)
        }
      )
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

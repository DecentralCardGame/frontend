<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
          aria-describedby="modalDescription"
          aria-labelledby="modalTitle"
          class="modal"
          role="dialog"
      >
        <header
            id="modalTitle"
            class="modal-header"
        >
          <slot name="header">
            Card Scheme Auction
            <button
                aria-label="Close modal"
                class="btn-close"
                type="button"
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
          <slot name="body">
            Current price: {{ currentPrice }}
            <br>
            You have: {{ creditsAvailable }}
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            Your bid: &nbsp;
            <input
                v-model="currentBid"
                :placeholder="[[ currentBid ]]"
                size="2"
                style="display: inline;color:black;height:50px;text-align: right"
                type="text"
                @keypress="isNumber($event)"
            > credits
          </slot>
          <button
              aria-label="Close modal"
              class="btn-teal"
              type="button"
              @click="buyCardScheme"
          >
            BUY
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import {buyCardSchemeTx, getAccInfo, getGameInfo} from '../utils/cardChain.js'
import {notify} from '../utils/utils.js'

export default {
  name: 'BuySchemeModal',
  data() {
    return {
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1
    }
  },
  mounted() {
    getGameInfo(this.$http)
        .then(res => {
          this.currentPrice = res.cardSchemePrice.amount + res.cardSchemePrice.denom
          this.currentBid = res.cardSchemePrice.amount
        })
        .catch(res => {
          console.error(res)
          this.close()
          return res
        })
    getAccInfo(this.$http, localStorage.address)
        .then(acc => {
          if (acc.alias === '') {
            notify.fail('NOT LOGGED IN', 'please login or register')
            throw new Error('unregistered account: ', localStorage.address)
          }

          if (!acc || !acc.coins) {
            notify.fail('NOT LOGGED IN', 'please login or register')
            throw new Error('no coins available for', localStorage.address)
          }

          let coins = {}
          for (let i = 0; i < acc.coins.length; i++) {
            if (acc.coins[i].denom === 'credits') {
              coins = acc.coins[i]
              break
            }
          }
          this.creditsAvailable = coins.amount + coins.denom
        })
        .catch(res => {
          console.error(res)
          this.close()
          return res
        })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    buyCardScheme() {
      this.$emit('close')
      buyCardSchemeTx(this.$http, this.currentBid)
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
@import "modal";
</style>

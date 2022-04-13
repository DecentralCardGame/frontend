<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
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
            Card Frame Auction
            <button
              aria-label="Close modal"
              class="btn--close"
              type="button"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>
        <section
          id="modalDescription"
          class="modal__body"
        >
          <slot name="body">
            <table class="table--buy-scard-scheme">
              <tr>
                <td>Current price:</td>
                <td><b>{{ currentPrice }}</b></td>
              </tr>
              <tr>
                <td>You have:</td>
                <td><b>{{ creditsAvailable }} credits</b></td>
              </tr>
              <tr>
                <td>Your bid:</td>
                <td>
                  <input
                    v-model="currentBid"
                    :placeholder="[[ currentBid ]]"
                    size="2"
                    type="text"
                    @keypress="isNumber($event)"
                  > <b> credits</b>
                </td>
              </tr>
            </table>
          </slot>
        </section>
        <footer class="modal__footer">
          <slot name="footer" />
          <button
            aria-label="Close modal"
            class="btn--default"
            type="button"
            @click="buyCardScheme"
          >
            Buy
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { creditsFromCoins } from '../utils/utils.js'

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
    this.$cardChain.getGameInfo()
        .then(res => {
          this.currentPrice = res.cardAuctionPrice.amount + ' ' + res.cardAuctionPrice.denom
          this.currentBid = res.cardAuctionPrice.amount
        })
        .catch(res => {
          console.error(res)
          this.close()
          return res
        })
    this.$cardChain.getAccInfo(this.$store.getters['common/wallet/address'])
        .then(acc => {
          if (!acc || !acc.coins) {
            this.notifyFail('NOT LOGGED IN', 'please login or register')
            throw new Error('no coins available for', this.$store.getters['common/wallet/address'])
          }

          this.creditsAvailable = creditsFromCoins(acc)
          this.$store.commit('setUserCredits', this.creditsAvailable)
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
      this.$cardChain.buyCardSchemeTx(this.currentBid)
        .then(acc => {
          this.creditsAvailable = creditsFromCoins(acc)
          this.$store.commit('setUserCredits', this.creditsAvailable)
        })
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

.table--buy-scard-scheme {
  td {
    padding: 0.25rem;
  }
  input {
    padding: 0;
    margin: 0;
    display: inline;
    color: $black;
    text-align: right;
    background-color: lightgray;
    font-weight: bold;
  }
}
</style>

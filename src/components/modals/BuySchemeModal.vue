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
            Card Scheme Auction
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
            Current price: {{ currentPrice }}
            <br>
            You have: {{ creditsAvailable }} credits
          </slot>
        </section>
        <footer class="modal__footer">
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
              class="btn--teal"
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
import { notify, creditsFromCoins } from '../utils/utils.js'
 
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
    this.getGameInfo()
        .then(res => {
          this.currentPrice = res.cardSchemePrice.amount + res.cardSchemePrice.denom
          this.currentBid = res.cardSchemePrice.amount
        })
        .catch(res => {
          console.error(res)
          this.close()
          return res
        })
    this.getAccInfo(this.$store.getters.getUserAddress)
        .then(acc => {
          if (acc.alias === '') {
            notify.fail('NOT LOGGED IN', 'please login or register')
            throw new Error('unregistered account: ', this.$store.getters.getUserAddress)
          }

          if (!acc || !acc.coins) {
            notify.fail('NOT LOGGED IN', 'please login or register')
            throw new Error('no coins available for', this.$store.getters.getUserAddress)
          }

          this.creditsAvailable = creditsFromCoins(acc.coins)
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
      this.buyCardSchemeTx(this.currentBid)
        .then(acc => {
          this.creditsAvailable = creditsFromCoins(acc.coins)
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
</style>

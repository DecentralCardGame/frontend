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
            <table class="table--buy-scard-frame">
              <tr>
                <td>You have:</td>
                <td><b>{{ ownedCardFrames }} Card Frames</b></td>
              </tr>
              <tr>
                <br>
              </tr>
              <tr>
                <td>Current price:</td>
                <td><b>{{ currentPrice }}</b></td>
                <td>credits</td>
              </tr>
              <tr>
                <td>You have:</td>
                <td><b>{{ creditsAvailable }} </b></td>
                <td>credits</td>
              </tr>
              <tr>
                <td>Your bid:</td>
                <td>
                  <input
                    v-model="currentBid"
                    :placeholder="[[ currentBid ]]"
                    size="3"
                    type="text"
                    @keypress="isNumber($event)"
                  >
                </td>
                <td>credits</td>
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
            @click="buyCardFrame"
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
  name: 'BuyFrameModal',
  data() {
    return {
      ownedCardFrames: 0,
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1
    }
  },
  mounted() {
    this.$cardChain.getGameInfo()
      .then(res => {
        let credits = parseInt(Math.ceil(res.cardAuctionPrice.amount / process.env.VUE_APP_UCREDITS_FACTOR))
        this.currentPrice = credits
        this.currentBid = credits
      })
      .catch(res => {
        console.error(res)
        this.close()
      })
    this.$cardChain.getUserInfo(this.$store.getters['common/wallet/address'])
      .then(user => {
        this.ownedCardFrames = user.ownedCardSchemes.length
        console.log("user", user)
      })
      .catch(res => {
        console.error(res)
        this.close()
      })
    this.$cardChain.getAccInfo(this.$store.getters['common/wallet/address'])
      .then(acc => {
        if (!acc || !acc.coins) {
          this.notifyFail('NOT LOGGED IN', 'please login or register')
          throw new Error('no coins available for', this.$store.getters['common/wallet/address'])
        }
        this.creditsAvailable = parseInt(Math.floor(creditsFromCoins(acc.coins) / process.env.VUE_APP_UCREDITS_FACTOR))
        this.$store.commit('setUserCredits', this.creditsAvailable)
      })
      .catch(res => {
        console.error(res)
        this.close()
      })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    buyCardFrame() {
      this.$emit('close')
      this.$cardChain.buyCardSchemeTx(this.currentBid * process.env.VUE_APP_UCREDITS_FACTOR)
        .then(this.$cardChain.updateUserCredits())
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

.table--buy-scard-frame {
  td {
    text-align: right;
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

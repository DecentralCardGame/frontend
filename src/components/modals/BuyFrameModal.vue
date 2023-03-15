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

<script lang=ts>
import * as R from "ramda"
import { useQuery } from "@/def-composables/useQuery";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useTx } from "@/def-composables/useTx";
import { Coin } from "@/model/Coin";

const { queryQUser, queryQCardchainInfo, queryAllBalances } = useQuery();
const { buyCardScheme } = useTx();

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
  setup() {
    const { loggedIn } = useLoggedIn();
    const { address } = useAddress();

    return {
      loggedIn, address
    }
  },
  mounted() {
    queryQCardchainInfo()
      .then(res => {
        console.log(res)
        let credits = res.cardAuctionPrice.normalize().amount
        this.currentBid = credits
        this.currentPrice = credits
      })
      .catch(res => {
        console.error(res)
        this.close()
      })
    queryQUser(this.address)
      .then(user => {
        this.ownedCardFrames = user.ownedCardSchemes.length
        console.log("user", user)
      })
      .catch(res => {
        console.error(res)
        this.close()
      })
    queryAllBalances(this.address)
      .then(acc => {
        let usableCoins: Coin[] = R.filter((coin: Coin) => { return coin.denom == "ucredits" }, acc.balances)
        if (usableCoins.length == 0) {
          throw new Error("No usable coins available")
        }
        this.creditsAvailable = usableCoins[0].normalize().amount
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
      buyCardScheme(new Coin("credits", this.currentBid).denormalize(), res => {
        console.log(res)
      }, () => {})
    },
    isNumber: function (evt) {
      evt = evt || window.event
      let charCode = (evt.which) ? evt.which : evt.keyCode
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

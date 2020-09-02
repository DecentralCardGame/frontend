<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header"
        >
          <slot name="header">
            Card Scheme Auction
            <button
              type="button"
              class="btn-close"
              aria-label="Close modal"
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
              type="text"
              :placeholder="[[ currentBid ]]"
              style="display: inline;color:black;height:50px;text-align: right"
              size="2"
              @keypress="isNumber($event)"
            > credits
          </slot>
          <button
            type="button"
            class="btn-teal"
            aria-label="Close modal"
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
import { buyCardSchemeTx, getGameInfo, getAccInfo } from './cardChain.js'
import { notify } from './utils.js'

export default {
  name: 'BuySchemeModal',
  data () {
    return {
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1
    }
  },
  mounted () {
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
    close () {
      this.$emit('close')
    },
    buyCardScheme () {
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
@import "../assets/styles/variables";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: $white;
  text-shadow: none;
  box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 0 rgba(0, 0, 0, 0.25);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    height: 100vh;
  }
}

.modal-header,
.modal-footer {
  padding: $font-size;
  display: flex;
}

.modal-header {
  border-bottom: $border-thickness solid $red;
  font-weight: bold;
  color: $red;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: ($font-size / 2);
  border-bottom: $border-thickness solid $red;
}

.btn-close {
  border: none;
  font-size: $font-size;
  padding: $font-size / 4;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.btn-green {
  background-color: transparent;
  border: none;
  color: $black;
  transition: all $animation-duration ease-out;

  &:after {
    z-index: -1;
    background: linear-gradient(to right, #4AAE9B 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
  }

  &:hover {
    color: $white;

    &:after {
      background-position: left bottom;
    }
  }
}

.btn-teal {
  background-color: transparent;
  border: none;
  color: $black;
  transition: all $animation-duration ease-out;

  &:after {
    z-index: -1;
    background: linear-gradient(to right, #12D1D1 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
  }

  &:hover {
    color: $white;

    &:after {
      background-position: left bottom;
    }
  }
}

.choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.choice-grid-button {
  margin: 0;
  width: 100%;
  &:after {
    margin: 0;
    z-index: -1;
    background: linear-gradient(to right, $red 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all $animation-duration ease-out;
    content: '';
    display: block;
    position: absolute;
    transform: skewX(0);
    box-shadow: none;
  }
  &:hover {
    color: $white;
    &:after {
      background-position: left bottom;
    }
  }
}
</style>

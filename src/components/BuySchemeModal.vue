<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog"
           aria-labelledby="modalTitle"
           aria-describedby="modalDescription"
      >
        <header
                class="modal-header"
                id="modalTitle"
        >
          <slot name="header">
            Card Scheme Auction
            <button
                    type="button"
                    class="btn-close"
                    @click="close"
                    aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
                class="modal-body"
                id="modalDescription"
        >
          <slot name="body">
            Current price: {{currentPrice}}
            <br>
            You have: {{creditsAvailable}}
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            Your bid: &nbsp;
            <input type='text'
                   v-model="currentBid"
                   :placeholder="[[ currentBid ]]"
                   @keypress="isNumber($event)"
                   style="display: inline;color:black;height:50px;text-align: right"
                   size=2
            /> credits
          </slot>
          <button
                  type="button"
                  class="btn-teal"
                  @click="buyCardScheme"
                  aria-label="Close modal">
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
  name: 'buySchemeModal',
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

<style>
  ::-webkit-input-placeholder { /* Edge */
    color: red;
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: red;
  }

  ::placeholder {
    color: red;
  }
  .input {
    color: black
  }

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
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #12D1D1;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #12D1D1;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .btn-teal {
    color: white;
    background: #12D1D1;
    border: 1px solid #12D1D1;
    border-radius: 2px;
    justify-content: flex;
  }
</style>

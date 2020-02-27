<script>
// import * as R from 'ramda'
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
        this.currentPrice = parseInt(res.data.amount) + 1 + res.data.denom // TODO actually this should work wtihout the + 1, maybe something is wrong in the blockchain?
        this.currentBid = parseInt(res.data.amount) + 1
      })
      .catch(res => {
        this.close()
        return res
      })
    getAccInfo(this.$http, localStorage.address)
      .then(res => {
        let coins = res.data.value.coins[0]
        this.creditsAvailable = coins.amount + coins.denom
      })
      .catch(res => {
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
      buyCardSchemeTx(this.$http, localStorage.address, localStorage.mnemonic, this.currentBid)
        .then(_ => { notify.success('EPIC WIN', 'You have successfully bought a card scheme.') })
        .catch(err => {
          if (err.response.data.error) {
            var errData = JSON.parse(err.response.data.error)
            if (errData.length > 0) {
              var errLog = JSON.parse(errData[0].log)
              console.log(errLog)
              notify.fail('IGNORE FEMALE, ACQUIRE CURRENCY', errLog.message)
            } else {
              console.error(errData)
              notify.fail('WHILE YOU WERE OUT', 'shit got serious.')
            }
          } else {
            console.error(err)
            notify.fail('WHILE YOU WERE OUT', 'shit got serious.')
          }
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

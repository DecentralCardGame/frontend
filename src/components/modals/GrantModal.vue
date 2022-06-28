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
            Grant Authz Rights
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
          Query Grants to
          <input
            v-model="qgrantee"
            type="text"
          >
          <button
            class="btn--default"
            @click="getGrants"
          >
            Get
          </button>
          <div align="left">
            <div
              v-for="(gt, i) in grants"
              :key="gt"
              class="grantBox"
            >
              <div
                class="clickBox"
                @click="show_extra[i] = !show_extra[i]"
              >
                Grant
                <a>{{ getShowName(gt.authorization.msg) }}</a>
              </div>
              <button
                class="btn--default"
                @click="revoke(gt.authorization.msg)"
              >
                Rewoke
              </button>
              <div
                v-show="show_extra[i]"
              >
                Expires at: <a>{{ gt.expiration }}</a>
              </div>
            </div>
          </div>
          <br>
          Grant action
          <select v-model="grant">
            <option
              v-for="option in options"
              :key="option"
              :value="option[1]"
            >
              {{ option[0] }}
            </option>
          </select>
          to
          <input
            v-model="grantee"
            type="text"
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

export default {
  name: 'GrantModal',
  props: {
  },
  data() {
    return {
      options: [
        ["vote", "/DecentralCardGame.cardchain.cardchain.MsgVoteCard"],
        ["add artwork", "/DecentralCardGame.cardchain.cardchain.MsgAddArtwork"],
        ["save card content", "/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent"],
        ["play game", "/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch"]],
      grant: "",
      grantee: this.getGrantee(),
      qgrantee: this.getGrantee(),
      warningText: "",
      grants: [],
      show_extra: [],
      saved_grantee: "",
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
        if (this.getGrantee()) {
          this.getGrants()
        }
      }
    },
    getShowName(name) {
      for (var i = 0; i<this.options.length; i++) {
        if (this.options[i][1] == name) {
          return this.options[i][0]
        }
      }
      return ""
    },
    revoke(msg) {
      this.$cardChain.revokeAuthz(this.saved_grantee, msg).then(res => {
        console.log(res)
        this.getGrants()
      })
    },
    getGrants() {
      if (! this.$cardChain.validAddress(this.qgrantee)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.$cardChain.getGrants(this.qgrantee)
      .then(grants => {
        this.grants = grants.grants
        this.saved_grantee = this.qgrantee
        this.show_extra = []
        for (var i = 0; i<this.grants.length; i++) {
          this.show_extra.push(false)
        }
        console.log(grants)
      })
    },
    close() {
      this.$emit('close')
    },
    send() {
      if (! this.grant) {
        this.warningText = "Choose an action!"
        return
      }
      if (! this.$cardChain.validAddress(this.grantee)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.warningText = ""
      localStorage.authzAddress = this.grantee
      console.log(localStorage.authzAddress)
      this.$cardChain.grantAuthz(this.grantee, this.grant).then(res => {
        if (this.getGrantee()) {
          this.getGrants()
        }
        console.log(res)
      })
    },
    getGrantee() {
      console.log(localStorage.authzAddress)
      return localStorage.authzAddress
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

.grantBox {
  margin: 5px;
  padding: 7px;
  position: relative;
  box-shadow: 2px 2px 4px;
  cursor: pointer;
  a {
    color: $black;
    font-weight: bold;
  }
  button {
    left: 80%;
    top: 0%;
    position: absolute;
    margin-left: 2px;
    color: red;
  }
}

.grantBox:hover {
  box-shadow: 4px 4px 8px;
}

.warning {
  color: red;
}
</style>

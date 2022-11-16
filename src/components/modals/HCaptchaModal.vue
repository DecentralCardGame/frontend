<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1000;"
    >
      <vue-hcaptcha
        :sitekey="siteKey"
        @verify="onVerify"
      />
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'

export default {
  name: 'HCaptchaModal',
  components: {
    VueHcaptcha
  },
  props: {
  },
  data() {
    return {
      siteKey: process.env.VUE_APP_FAUCET_SITEKEY
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onVerify (res) {
      console.log("res", res)
      this.$emit('close')

      const data = {
              address: this.$store.getters['common/wallet/address'],
              token: res,
              alias: this.$store.getters['common/wallet/walletName']
      }

      const request = new Request(process.env.VUE_APP_FAUCET, {
          method: 'POST',
          headers: {
              'Accept': 'application/json'
          },
          body: JSON.stringify(data)
      })

      fetch(request).then(response => {
        console.log("response", response)

        if (response.status === 401) {
          this.notifyFail('Error', 'Error captcha. Please reload page.')
          return
        }
        else if (response.status === 402) {
          this.notifyFail('Error', 'You have already claimed tokens')
          return
        }
        else if (response.status === 403) {
          this.notifyFail('Error', 'Probably the incorrect address')
          return
        }
        else {
          this.notifySuccess('Success', 'Registered Account')
          return
        }
      })


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

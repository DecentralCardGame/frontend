<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1000;"
    >
      <vue-hcaptcha
        sitekey="8cc41448-0666-47c2-ae31-be4ea1263aab"
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
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async onVerify (res) {
      console.log("res", res)
      this.$emit('close')

      const params = new URLSearchParams();
      params.append('address', this.$store.getters['common/wallet/address']);
      params.append('token', res)

      const response = fetch('http://dragonapi.space:8081/api/claimTokens', {
          method: 'POST',
          body: params,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      })

      console.log("response", response)

      const json = await response.json();

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

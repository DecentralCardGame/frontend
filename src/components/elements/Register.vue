<template>
  <div>
    <h2>Join the Experience</h2><br>
    <p>Good to see you here! Before you can dive into the universe of Crowd Control, you need to make an account.</p><br>
    <p>AT THE MOMENT E-MAIL SIGNUP IS NOT IMPLEMENTED - JUST PRESS REGISTER TO ACTIVATE YOUR ACCOUNT ON THE BLOCKCHAIN </p><p>
    </p>
    <br>
    <form @submit.prevent="register">
      <label>
        Username:
      </label>
      <input
              v-model="username"
              type="text"
              placeholder="Enter Username"
              name="uname"
      >
      <label>
        Password:
      </label>
      <input
              v-model="password"
              type="password"
              placeholder="Enter Password"
              name="psw"
      >
      <label>
        E-Mail:
      </label>
      <input
              v-model="email"
              type="mail"
              placeholder="Enter E-Mail"
              name="mail"
      >
      <label>
        Mnemonic:
      </label>
      <input
              v-model="mnemonic"
              type="text"
              placeholder="Enter Mnemonic"
              name="mail"
      >
      <button type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { registerAccTx, generateMnemonic } from '../cardChain.js'
import { createWalletFromMnemonic } from '@tendermint/sig/dist/web'

export default {
  name: 'RegisterPage',
  data () {
    return {
      alias: '',
      username: '',
      password: '',
      email: '',
      mnemonic: ''
    }
  },
  methods: {
    register () {
      if (!this.mnemonic) {
        this.mnemonic = generateMnemonic()
      } else {
        // TODO check if user has entered a serious mnemonic
      }

      let wallet = createWalletFromMnemonic(this.mnemonic)

      localStorage.wallet = wallet
      localStorage.address = wallet.address
      localStorage.mnemonic = this.mnemonic

      const encryptedMnemonic = this.CryptoJS.AES.encrypt(JSON.stringify(this.mnemonic), this.password).toString()
      const post = {
        email: this.email,
        username: this.username,
        password: this.password,
        mnemonic: encryptedMnemonic
      }

      this.$hottub.post('/register', post)
              .then((res) => {
                console.log(res)
                registerAccTx(this.$http, this.username)
                this.$router.push('/')
              })
              .catch(() => {
                this.$notify.fail('Backend registration failed!')
              })
    }
  }
}
</script>

<style scoped>
  input {
    margin-bottom: 0.3em;
  }
</style>

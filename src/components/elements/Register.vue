<template>
  <div>
    <h2>Join the Experience</h2><br>
    <p>Good to see you here! Before you can dive into the universe of Crowd Control, you need to make an account.</p><br>
    <p>AT THE MOMENT E-MAIL SIGNUP IS NOT IMPLEMENTED - JUST PRESS REGISTER TO ACTIVATE YOUR ACCOUNT ON THE BLOCKCHAIN </p><p>
    </p>
    <form @submit.prevent="register">
      <label>
        <b>Username: </b>
        <input
          v-model="username"
          type="text"
          placeholder="Enter Username"
          name="uname"
        > <!--required-->
      </label>
      <label>
        <b>Password: </b>
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password"
          name="psw"
        >
      </label>
      <label>
        <b>E-Mail: </b>
        <input
          v-model="email"
          type="mail"
          placeholder="Enter E-Mail"
          name="mail"
        >
      </label>
      <label>
        <b>Mnemonic: </b>
        <input
          v-model="mnemonic"
          type="text"
          placeholder="Enter Mnemonic"
          name="mail"
        >
      </label>
      <button type="submit">
        Register
      </button>
    </form>
    <br>
    <h2>Join the Community</h2><br>
    <p>To join forces with other designers, players or trolls it is best to join our Discord server. Also to find someone to teach you the game!</p><br>
    <form action="https://discord.gg/yPA3aKe">
      <button type="submit">
        Join Discord
      </Button>
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

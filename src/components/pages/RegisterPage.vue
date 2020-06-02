<template>
  <content-container-component>
    <h2>Join the Experience</h2><br>
    <p>Good to see you here! Before you can dive into the universe of Crowd Control, you need to make an account.</p><br>
    <p>AT THE MOMENT E-MAIL SIGNUP IS NOT IMPLEMENTED - JUST PRESS REGISTER TO ACTIVATE YOUR ACCOUNT ON THE BLOCKCHAIN <p><br>
    <form @submit.prevent="register">
      <label>
        <b>Username: </b>
        <input type="text" v-model="username" placeholder="Enter Username" name="uname"> <!--required-->
      </label>
      <br>
      <label>
        <b>Password: </b>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw">
      </label>
      <br>
      <label>
        <b>E-Mail: </b>
        <input type="mail" v-model="email" placeholder="Enter E-Mail" name="mail">
      </label>
    <br>
    <label>
      <b>Mnemonic: </b>
      <input type="text" v-model="mnemonic" placeholder="Enter Mnemonic" name="mail">
    </label>
      <br><br>
      <button type="submit">Register</button>
    </form>
    <br>
    <h2>Join the Community</h2><br>
    <p>To join forces with other designers, players or trolls it is best to join our Discord server. Also to find someone to teach you the game!</p><br>
    <form action="https://discord.gg/yPA3aKe">
      <button type="submit">Join Discord</Button>
    </form>
  </content-container-component>
</template>

<script>
import { registerAccTx, generateMnemonic } from '../cardChain.js'
import { notify } from '../utils.js'
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
        .catch(() => {
          notify.fail('Backend registration failed!')
        })

      registerAccTx(this.$http, this.username)

      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
  input {
    margin-bottom: 0.3em;
  }
</style>

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
// import axios from 'axios'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import { generateAndBroadcastTx } from '../cardChain.js'
import { notify } from '../utils.js'

export default {
  name: 'RegisterPage',
  components: {ContentContainerComponent},
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
      let reqBody = {
        'base_req': {
          'from': process.env.VUE_APP_CREATOR_ADDRESS,
          'chain_id': 'testCardchain',
          'gas': 'auto',
          'gas_adjustment': '1.5'
        },
        'new_user': localStorage.address,
        'creator': process.env.VUE_APP_CREATOR_ADDRESS,
        'alias': this.alias
      }

      const encryptedMnemonic = this.CryptoJS.AES.encrypt(JSON.stringify(this.mnemonic), this.password).toString()
      const post = {
        email: this.email,
        username: this.username,
        password: this.password,
        mnemonic: encryptedMnemonic
      }

      this.$http.post('http://localhost:1323/register', post)
        .then((res) => {
          console.log(res)
        })

      generateAndBroadcastTx(this.$http, 'cardservice/create_user', process.env.VUE_APP_CREATOR_ADDRESS, reqBody, process.env.VUE_APP_CREATOR_MNEMONIC)
        .then(console.log)
        .then(_ => notify.success('EPIC WIN', 'You have successfully registered in the blockchain.'))

      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
</style>

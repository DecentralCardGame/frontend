<template>
  <content-container-component>
    <h2>Join the Experience</h2><br>
    <p>Good to see you here! Before you can dive into the universe of Crowd Control, you need to make an account.</p><br>
    <form @submit.prevent="register">
      <label>
        <b>Username: </b>
        <input type="text" v-model="alias" placeholder="Enter Username" name="uname" required>
      </label>
      <br>
      <label>
        <b>Password: </b>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw">
      </label>
      <br>
      <label>
        <b>E-Mail: </b>
        <input type="mail" v-model="mail" placeholder="Enter E-Mail" name="mail">
      </label>
      <br><br>
      <button type="submit">Register</button>
    </form>
  </content-container-component>
</template>

<script>
// import axios from 'axios'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import { signTx } from 'signcosmostx/signStuff'

export default {
  name: 'RegisterPage',
  components: {ContentContainerComponent},
  data () {
    return {
      alias: '',
      key: '',
      password: '',
      mail: ''
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
        'new_user': JSON.parse(localStorage.keyPair).address,
        'creator': process.env.VUE_APP_CREATOR_ADDRESS,
        'alias': this.alias
      }

      console.log(process.env.VUE_APP_CREATOR_ADDRESS)
      console.log(process.env.VUE_APP_CREATOR_MNEMONIC)

      generateAndBroadcastTx(this.$http, reqBody)
        .then(response => {console.log(response)})
    }
  }
}

function generateAndBroadcastTx (http, reqBody) {
  return http.get('auth/accounts/' + process.env.VUE_APP_CREATOR_ADDRESS)
    .then(userdata => {
      return http.put('cardservice/create_user', reqBody)
        .then((response) => {
          console.log(process.env.VUE_APP_CREATOR_MNEMONIC)

          let signed = signTx(response.data, process.env.VUE_APP_CREATOR_MNEMONIC, 'testCardchain', userdata.data.value.account_number, userdata.data.value.sequence)

          return http.post('txs', {
            'tx': signed.value,
            'mode': 'block'
          })
        })
    })
}

</script>

<style scoped>

</style>

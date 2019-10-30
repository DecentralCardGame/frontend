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
        <input type="email" v-model="email" placeholder="Enter E-Mail" name="mail">
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
      this.$http.get('auth/accounts/cosmos178x4cwg7zuppfgypdd7c0wy0kp304wad9v0awe')
        .then(userdata => {
          this.$http.put(
            'cardservice/create_user',
            {
              'base_req': {
                'from': 'cosmos178x4cwg7zuppfgypdd7c0wy0kp304wad9v0awe',
                'chain_id': 'testCardchain',
                'gas': 'auto',
                'gas_adjustment': '1.5'
              },
              'new_user': JSON.parse(localStorage.keyPair).address,
              'creator': 'cosmos178x4cwg7zuppfgypdd7c0wy0kp304wad9v0awe',
              'alias': this.alias
            }).then(response => {
            let signed = signTx(response.data, 'obey regular kiwi crop middle letter ten ivory foot supreme spice job beef dignity loan easy amateur wall skill cube random post grunt blind', 'testCardchain', userdata.data.value.account_number, userdata.data.value.sequence)

            this.$http.post('txs', {
              'tx': signed.value,
              'mode': 'block'
            }).then(response => {
              console.log(response)
            })
          })
        })
    }
  }
}
</script>

<style scoped>

</style>

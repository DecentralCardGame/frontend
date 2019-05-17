<template>
  <content-container-component>
    <form @submit.prevent="register">
      <label>
        <b>Alias: </b>
        <input type="text" v-model="alias" placeholder="Enter Username" name="uname" required>
      </label>
      <br>
      <label>
        <b>Key: </b>
        <input type="text" v-model="key" placeholder="Enter Key" name="key" required>
      </label>
      <br>
      <label>
        <b>Password: </b>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw" required>
      </label>
      <br>
      <button type="submit">Registrieren</button>
    </form>
  </content-container-component>
</template>

<script>
import axios from 'axios'
import ContentContainerComponent from '@/components/ContentContainerComponent'
export default {
  name: 'RegisterPage',
  components: {ContentContainerComponent},
  data () {
    return {
      alias: '',
      key: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post(
        this.apiURL + '/cardservice/create_user',
        {
          'base_req': {
            'from': this.key,
            'password': this.password,
            'chain_id': this.chainID,
            'sequence': '0',
            'account_number': '0',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'new_user': this.key,
          'creator': this.key,
          'alias': this.alias
        }).then(response => (this.cards = response.data))
    }
  }
}
</script>

<style scoped>

</style>

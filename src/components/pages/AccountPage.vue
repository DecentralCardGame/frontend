<template>
  <div>
    <h2>Account Settings</h2>
    <h3>Cosmos Settings</h3>
    <br>
    <p>Mnemonic: <input v-model="mnemonic" name="mnemonic"></p>
    <p>Address: <input v-model="address" name="address"></p>
    <br>
    <button @click="save()">Change</button>
    <br><br>
  </div>
</template>

<script>
export default {
  name: 'AccountPage',
  data () {
    return {
      mnemonic: '',
      address: ''
    }
  },
  mounted () {
    this.mnemonic = JSON.parse(localStorage.keyPair).secret
    this.address = JSON.parse(localStorage.keyPair).address
  },
  methods: {
    save () {
      localStorage.keyPair.secret = this.mnemonic
      localStorage.keyPair.address = this.address
      localStorage.keyPair.privateKey = 'messed up'
      localStorage.keyPair.publicKey = 'messed up'
    }
  }
}
</script>

<style scoped>

</style>

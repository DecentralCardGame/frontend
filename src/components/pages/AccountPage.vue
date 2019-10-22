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
    this.mnemonic = localStorage.cosmosMnemonic
    this.address = localStorage.cosmosAddress
  },
  methods: {
    save () {
      localStorage.cosmosMnemonic = this.mnemonic
      localStorage.cosmosAddress = this.address
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <h2>Account Settings</h2>
    <h3>Cosmos Settings</h3>
    <br>
    <p>The following is the most important part of your account: </p> <br>
    <p>
      Mnemonic: <input
        v-model="mnemonic"
        name="mnemonic"
        size="50"
      >
    </p> <br>
    <!-- <p>Address: <input v-model="address" name="address" size="40"></p> <br> -->
    <p>Your Mnemonic is your secret key, save it. Write it down. Don't lose it. Never tell it anyone. It is randomly generated on this website only for you, it is not transferred to our servers. You can use it to recover your account. If you already have a mnemonic just enter it and press recover.</p>
    <p>Your Address is used to transfer cards and credits to other users. You can share it with anyone. </p>
    <br>
    <button @click="save()">
      Recover
    </button>
    <button @click="logout()">
      Logout
    </button>
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
    this.mnemonic = this.$store.getters.getUserMnemonic
    // this.mnemonic = localStorage.mnemonic
    this.address = localStorage.address
  },
  methods: {
    save () {
      localStorage.mnemonic = this.mnemonic
      localStorage.address = this.address
    },
    logout () {
      this.$store.commit('logout')
      this.$notify({
        group: 'success',
        title: 'Logout successful!'
      })
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>

</style>

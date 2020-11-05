<template>
  <div>
    <h2>Login</h2>
    <p><b>Before you can carry on, please Log-In with your credentials. If you don't have an account you can register.</b></p>
    <p v-if="loginError">
      Login fehlgeschlagen!
    </p>
    <form @submit.prevent="login">
      <label>
        Username*
      </label>
      <input
              v-model="username"
              type="text"
              placeholder="username"
              name="uname"
              required
      >
      <label>
        Password*
      </label>
      <input
              v-model="password"
              type="password"
              placeholder="**********"
              name="psw"
              required
      >
      <label>Stay logged in
        <input
                type="checkbox"
                checked="checked"
                name="remember"
        >
      </label>
      <button type="submit">
        Login
      </button><br>
      <!-- <span class="psw">Forgot <a href="#">password</a>?</span> -->
    </form>
  </div>
</template>

<script>
import { createWalletFromMnemonic } from '@tendermint/sig/dist/web'

export default {
  name: 'Login',
  data () {
    return {
      loginError: null,
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const request = {
        username: this.username,
        password: this.password
      }
      console.log(this)
      this.$hottub.post('/login', request)
        .then((res) => {
          console.log('res:', res)
          if (res.status !== 200) {
            console.log(res.status)
            this.$notify({
              group: 'fail',
              title: 'Login failed!'
            })
          } else {
            const decryptedMnemonicBytes = this.CryptoJS.AES.decrypt(res.data.mnemonic, this.password)
            const decryptedMnemonic = JSON.parse(decryptedMnemonicBytes.toString(this.CryptoJS.enc.Utf8))

            this.$store.commit('setUserToken', res.data.token)
            this.$store.commit('setUserMnemonic', decryptedMnemonic)
            let wallet = createWalletFromMnemonic(decryptedMnemonic)
            this.$store.commit('setUserAddress', wallet.address)
            this.cardChain().updateUserCredits()
            this.$store.commit('toggleLoginBox')
            this.$router.push('me')

            this.$notify({
              group: 'success',
              title: 'Login successful!'
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.$notify({
            group: 'fail',
            title: 'Login failed! Reason: ' + err
          })
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

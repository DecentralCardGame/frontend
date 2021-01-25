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
        Password* <span
          class="link--show-pw"
          @click="showPw = !showPw"
        >({{ showPw ? "hide" : "show" }})</span>
      </label>
      <input
        v-model="password"
        :type="showPw ? 'text' : 'password'"
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
      password: '',
      showPw: false
    }
  },
  methods: {
    login () {
      const request = {
        username: this.username,
        password: this.password
      }
      this.$hottub.post('/login', request)
        .then((res) => {
          if (res.status !== 200) {
            console.error(res)
            this.notifyFail('YOU FAIL', 'Login failed! ' + res.status)
          } else {
            const decryptedMnemonicBytes = this.CryptoJS.AES.decrypt(res.data.mnemonic, this.password)
            const decryptedMnemonic = JSON.parse(decryptedMnemonicBytes.toString(this.CryptoJS.enc.Utf8))

            this.$store.commit('setUserToken', res.data.token)
            this.$store.commit('setUserMnemonic', decryptedMnemonic)
            let wallet = createWalletFromMnemonic(decryptedMnemonic)
            this.$store.commit('setUserAddress', wallet.address)
            this.$cardChain.updateUserCredits()
            this.$store.commit('toggleLoginBox')
            this.$router.push('me')

            this.notifySuccess('Very Nice', 'Login successful!')
          }
        })
        .catch((err) => {
          console.error(err)
          this.notifyFail('YOU FAIL', 'Login failed! ' + err)
        })
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 0.3em;
}
.link--show-pw {
  text-decoration: underline;
  cursor: pointer;
}
</style>

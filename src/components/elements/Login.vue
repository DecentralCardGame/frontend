<template>
  <div>
    <h2>Login</h2>
    <p>Before you can carry on, please Log-In with your credentials. If you don't have an account you can register.</p>
    <p v-if="loginError">
      Login fehlgeschlagen!
    </p>
    <form @submit.prevent="login">
      <label>
        Username:
      </label>
      <input
              v-model="username"
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
      >
      <label>
        Password:
      </label>
      <input
              v-model="password"
              type="password"
              placeholder="Enter Password"
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
      this.$hottub.post('/login', request)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) {
            this.$notify({
              group: 'fail',
              title: 'Login failed!'
            })
          } else {
            const decryptedMnemonicBytes = this.CryptoJS.AES.decrypt(res.data.mnemonic, this.password)
            const decryptedMnemonic = JSON.parse(decryptedMnemonicBytes.toString(this.CryptoJS.enc.Utf8))
            this.$store.commit('setUserToken', res.data.token)
            this.$store.commit('setUserMnemonic', decryptedMnemonic)
            this.$notify({
              group: 'success',
              title: 'Login successful!'
            })
            this.$router.push('me')
          }
        })
        .catch(() => {
          this.$notify({
            group: 'fail',
            title: 'Login failed!'
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

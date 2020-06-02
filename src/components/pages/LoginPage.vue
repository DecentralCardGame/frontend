<template>
  <content-container-component>
    <h2>Welcome back!</h2>
    <br>
    <p>Before you can carry on, please Log-In with your credentials. If you don't have an account you can register.</p>
    <br>
    <p v-if="$route.query.redirect">Bitte logge dich ein!</p>
    <p v-if="loginError">Login fehlgeschlagen!</p>
    <form @submit.prevent="login">
      <label>
        <b>Username: </b>
        <input type="text" v-model="username" placeholder="Enter Username" name="uname" required>
      </label>
      <br>
      <label>
        <b>Password: </b>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw" required>
      </label>
      <br>
      <br>
      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Stay logged in
      </label><br>
      <!-- <span class="psw">Forgot <a href="#">password</a>?</span> -->
    </form>
  </content-container-component>
</template>

<script>
export default {
  name: 'LoginPage',
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

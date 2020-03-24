<template>
  <content-container-component>
    <h2>Welcome back!</h2>
    <br>
    <p>Before you can carry on, please Log-In with your credentials. If you don't have an account you can register.</p>
    <p> THIS IS CURRENTLY NOT WORKING </p>
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
      <span class="psw">Forgot <a href="#">password</a>?</span>
    </form>
  </content-container-component>
</template>

<script>
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '../CardComponent'
export default {
  name: 'LoginPage',
  components: {CardComponent, ContentContainerComponent},
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
      console.log(request)
      this.$http.post('http://localhost:1323/login', request)
        .then((res) => {
          const decryptedMnemonicBytes = this.CryptoJS.AES.decrypt(res.data.mnemonic, this.password)
          const decryptedMnemonic = JSON.parse(decryptedMnemonicBytes.toString(this.CryptoJS.enc.Utf8));

          console.log(decryptedMnemonic.toString())
        })
    }
  }
}
</script>

<style scoped>

</style>

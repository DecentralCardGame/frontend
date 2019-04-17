<template>
  <content-container-component>
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

      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Eingeloggt bleiben
      </label><br>
      <span class="psw"><a href="#">Passwort</a> vergessen?</span>
    </form>
  </content-container-component>
</template>

<script>
import ContentContainerComponent from '@/components/ContentContainerComponent'
export default {
  name: 'LoginPage',
  components: {ContentContainerComponent},
  data () {
    return {
      loginError: null,
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // put real login functionality here!
      this.$router.replace(this.$route.query.redirect || '/')
    }
  }
}
</script>

<style scoped>
input[type="text"], input[type="password"] {
  background-color: transparent;
  border: 1px solid rgb(0, 108, 161);
  padding: 0.5em;
  margin: 0.5em 0 0.5em;
}
  button {
    background-color: rgb(0, 108, 161);
    border: none;
    width: 100%;
    cursor: pointer;
    padding: 1em;
  }
</style>

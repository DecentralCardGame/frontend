<template>
  <content-container-component>
    <form>
      <label>
        <b>Username: </b>
        <input type="text" placeholder="Enter Username" name="uname" required>
      </label>
      <br>
      <label>
        <b>Password: </b>
        <input type="password" placeholder="Enter Password" name="psw" required>
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
  components: {ContentContainerComponent}
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

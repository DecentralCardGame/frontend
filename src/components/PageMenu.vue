<template>
  <nav>
    <div class="content">
      <img class="logo" src="../assets/logo.svg">
      <ul>
        <li><router-link to="/about">The Game</router-link></li>
        <li><router-link to="/newcard">Card Creator</router-link></li>
        <li><router-link to="/">Gallery</router-link></li>
        <li><router-link to="/vote">Voting</router-link></li>
        <li v-if="!$store.getters.loggedIn" ><router-link to="/login">Login</router-link></li>
        <li v-if="!$store.getters.loggedIn" ><router-link class="exposed" to="/register">Join</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageMenu'
}
</script>

<style scoped>
  nav {
    background-color: #12d1d1ff;
    box-shadow: 0.5em 0.5em 0 #d61224ff;
    position: relative;
    margin: 2em 5em;
    transform: skewX(-15deg);
  }
  .content {
    transform: skewX(15deg);
    display: flex;
    flex-flow: row;
  }
  ul {
    width: auto;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  .logo {
    position: relative;
    display: inline-block;
    margin: -1em 1em -2em;
    user-select: none;
    -webkit-user-drag: none;
    width: 300px;
    height: 100%;
  }

  li a {
    display: block;
    color: white;
    border: 0.2em solid transparent;
    text-align: center;
    padding: 1.2rem 1.2rem;
    text-decoration: none;
  }

  li a.exposed {
    transform: skewX(-15deg);
    background-color: white;
    color: black;
    padding: 0.6em;
    margin-top: 0.5em;
    padding-left: 2em;
    padding-right: 2em;
  }

  li a:hover {
    border-color: white;
  }
</style>

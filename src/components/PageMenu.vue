<template>
  <nav>
    <div class="content">
      <img alt="Crowd Control" class="logo" src="../assets/logo.svg">
      <ul>
        <li><router-link to="/about">The Game</router-link></li>
        <li><router-link to="/newcard">Card Creator</router-link></li>
        <li><router-link to="/">Gallery</router-link></li>
        <li v-if="$store.getters.loggedIn"><router-link to="/vote">Voting</router-link></li>
        <li v-if="!$store.getters.loggedIn" class="exposed"><router-link to="/login">Login</router-link></li>
        <li v-if="!$store.getters.loggedIn" class="exposed"><router-link class="exposed" to="/register">Join</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageMenu'
}
</script>

<style scoped lang="scss">
  nav {
    background-color: #12d1d1ff;
    box-shadow: 0.5em 0.5em 0 #d61224ff;
    position: relative;
    margin: 2em 5em;
    transform: skewX(-15deg);

    @media (max-width: 480px) {
      transform: skewX(0);
      margin: 0;
    }
  }

  .content {
    transform: skewX(15deg);
    display: flex;
    flex-flow: row;

    @media (max-width: 480px) {
      transform: skewX(0);
      display: flex;
      flex-flow: column;
    }
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

    @media (max-width: 480px) {
      width: 100%;
    }

    a {
      display: block;
      color: white;
      border: 0.2em solid transparent;
      text-align: center;
      padding: 1.2rem 1.2rem;
      text-decoration: none;
      transition: background-color 0.1s;
      &:hover {
        transition: all 0.1s;
        border-color: white;
        &.exposed {
          border-color: black;
        }
      }
    }
    &.exposed {
      transform: skewX(-15deg);
      background-color: white;
      a {
        color: black;
      }

      @media (max-width: 480px) {
        transform: skewX(0deg);
      }
    }
  }

  .logo {
    position: relative;
    display: inline-block;
    margin: -1em 1em -2em;
    user-select: none;
    -webkit-user-drag: none;
    width: 300px;
    height: 100%;


    @media (max-width: 480px) {
      margin: 1em auto;
      width: 50%;
    }
  }
</style>

<template>
  <nav>
    <div class="content">
      <img alt="Crowd Control" class="logo" src="../assets/logo.svg">
      <div class="menu-button" v-on:click="displayMenu = !displayMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </div>
      <ul v-bind:class="showMenuClass">
        <li><router-link to="/about">The Game</router-link></li>
        <li><router-link to="/newcard">Card Creator</router-link></li>
        <li><router-link to="/">Gallery</router-link></li>
        <li v-if="$store.getters.loggedIn"><router-link to="/vote">Voting</router-link></li>
        <li v-if="!$store.getters.loggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="!$store.getters.loggedIn"><router-link class="exposed" to="/register">Join</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageMenu',
  data () {
    return {
      displayMenu: false
    }
  },
  computed: {
    showMenuClass () {
      if (this.displayMenu) {
        return ""
      } else {
        return "hide-menu"
      }
    }
  },
}
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";

  nav {
    background-color: $blue;
    box-shadow: 0.5rem 0.5rem 0 $red;
    position: relative;
    margin: 2.5rem 5rem;
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
      color: $white;
      border: $border-thickness solid transparent;
      text-align: center;
      padding: 1.2rem 1.2rem;
      text-decoration: none;
      transition: all 0.1s;
      &:hover {
        transition: all 0.1s;
        border-color: $white;
      }
    }
    &.exposed {
      transform: skewX(-15deg);
      background-color: $white;
      a {
        color: $black;
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
      width: 30%;
    }
  }

  .menu-button {
    @media (min-width: 480px) {
      display: none;
    }
    position: absolute;
    right: 1em;
    top: 1em;
  }

  .hide-menu {
    @media (max-width: 480px) {
      display: none;
    }
  }
</style>

<template>
  <div>
    <nav>
      <div class="content">
        <router-link
          to="/"
          class="logo"
        >
          <img
            alt="Crowd Control"
            src="../../assets/logo.svg"
          >
        </router-link>
        <div
          class="menu-button"
          @click="displayMenu = !displayMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-menu"
          ><line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
          /><line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          /><line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
          /></svg>
        </div>
        <ul :class="showMenuClass">
          <li>
            <router-link to="/">
              The Game
            </router-link>
          </li>
          <li>
            <router-link to="/newcard">
              Card Creator
            </router-link>
          </li>
          <li>
            <router-link to="/gallery">
              Gallery
            </router-link>
          </li>
          <li>
            <router-link to="/vote">
              Voting
            </router-link>
          </li>
          <li v-if="$store.getters.loggedIn">
            <router-link to="/vote">
              Voting
            </router-link>
          </li>
          <li
            v-if="!$store.getters.loggedIn"
            @click="$store.commit('toggleLoginBox')"
          >
            <div :class="displayLoginDialogue ? 'menu-item activated' : 'menu-item'">
              Login / Join
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div
      v-if="this.$store.getters.loginBoxVisible"
      class="lp-dialogue"
    >
      <div class="box-auth">
        <div class="box-login">
          <LoginPage />
        </div>
        <div class="box-register">
          <RegisterPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from '../elements/Login'
import RegisterPage from '../elements/Register'
export default {
  name: 'PageMenu',
  components: {RegisterPage, LoginPage},
  data () {
    return {
      displayMenu: false,
      displayLoginDialogue: false
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
  @import "../../assets/styles/variables";

  nav {
    font-weight: bold;
    background-color: $blue;
    box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 0 $red;
    position: relative;
    margin: 2.5rem 5rem;
    transform: skewX(-15deg);

    @media (max-width: 480px) {
      transform: skewX(0);
      margin: 0;
    }
  }

  .content {
    position: relative;
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

    /*
    .hvr-bounce-to-right {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}
.hvr-bounce-to-right:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2098D1;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-bounce-to-right:hover, .hvr-bounce-to-right:focus, .hvr-bounce-to-right:active {
  color: white;
}
.hvr-bounce-to-right:hover:before, .hvr-bounce-to-right:focus:before, .hvr-bounce-to-right:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
}
     */

    a, .menu-item {
      padding: 1.5rem;
      color: $white;
      text-align: center;
      cursor: pointer;
      text-decoration: none;


      display: inline-block;
      vertical-align: middle;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      position: relative;
      -webkit-transition-property: color;
      transition-property: color;
      -webkit-transition-duration: $animation-duration;
      transition-duration: $animation-duration;
      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $white;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0 50%;
        transform-origin: 0 50%;
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transition-duration: $animation-duration;
        transition-duration: $animation-duration;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
      }
      &:hover, &:focus, &:active {
        color: $red;
      }
      &:hover:before, &:focus:before, &:active:before {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
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

  .lp-dialogue {
    position: absolute;
    width: 60vw;
    right: 5.5rem;
    margin-top: -2.5rem;
    z-index: 10000000;
    box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 rgba(0,0,0,0.3);
    @media (max-width: 480px) {
      width: 100vw;
      margin-top: -1px;
      right: 0;
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

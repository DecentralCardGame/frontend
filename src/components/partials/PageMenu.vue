<template>
  <div class="nav-wrapper">
    <nav class="nav">
      <div class="nav__content">
        <router-link
          to="/"
          class="nav__logo"
        >
          <img
            alt="Crowd Control"
            src="../../assets/logo.svg"
          >
        </router-link>
        <div
          class="nav__button"
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
          <li v-if="$store.getters.loggedIn">
            <router-link to="/vote">
              Voting
            </router-link>
          </li>
          <li
            v-if="!$store.getters.loggedIn"
            @click="$store.commit('toggleLoginBox')"
          >
            <div :class="displayLoginDialogue ? 'nav__menu__item nav__menu__item--exposed' : 'nav__menu__item '">
              Login / Join
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div
      v-if="this.$store.getters.loginBoxVisible"
      class="nav__authentication-modal"
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
        return "nav__menu "
      } else {
        return "nav__menu nav__menu--hidden"
      }
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variables";

  .nav-wrapper {
    max-width: 75vw;
    margin: auto;
  }

  .nav {
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

  .nav__content {
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

  .nav__menu {
    width: auto;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .nav__menu li {
    float: left;
    @media (max-width: 480px) {
      width: 100%;
    }

    a, .nav__menu__item {
      padding: 1.5rem;
      font-size: $font-size*1.15;
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
      @media (max-width: 480px) {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
      }
    }
    &.nav__menu__item--exposed {
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

  .nav__authentication-modal {
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

  .nav__logo {
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

  .nav__button {
    @media (min-width: 480px) {
      display: none;
      width: 100%;
    }
    position: absolute;
    right: 1.5em;
    top: 1.5em;
  }

  .nav__menu--hidden {
    @media (max-width: 480px) {
      display: none;
    }
  }
</style>

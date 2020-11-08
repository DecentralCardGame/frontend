<template>
  <div class="footer-container">
    <div class="pre-footer">
      <div class="pre-footer__content">
        <p>Ok, ok I have read enough. I am ready to</p>
        <a v-if="userLoggedIn" 
          @click="$store.commit('toggleLoginBox')">
          <button>Join</button>
        </a>
        <a v-else href="https://discord.gg/ZKKbhUs">
          <button>Join</button>
        </a>

        <p>this awesome community and have tons of fun.</p>
      </div>
      <!-- <div class="triangle-pre" /> -->
      <!-- <div class="square-pre" /> -->
    </div>
    <footer>
      <!-- <div class="triangle" /> -->
      <div class="footer__content">
        <ul class="footer__menu">
          <li>
            <router-link to="/">
              <h2>The Game</h2>
              Rules, Ideas and historical Context.
            </router-link>
          </li>
          <li>
            <router-link to="/newcard">
              <h2>Card Creator</h2>
              Get creative and rule the world.
            </router-link>
          </li>
          <li>
            <router-link to="/gallery">
              <h2>Gallery</h2>
              See what is out there.
            </router-link>
          </li>
          <li>
            <a href="https://discord.gg/ZKKbhUs">
            <h2>Community Discord</h2>
            Get in touch. Not physical, thooo.
            </a>
          </li>
          <li>
            <a href="https://t.me/DecentralCardNetwork">
            <h2>Telegram</h2>
            for 'crypto enthusiasts'
            </a>
          </li>
          <li>
            <a href="https://github.com/DecentralCardGame">
            <h2>Github</h2>
            Checkout our codebase
            </a>
          </li>
          <li>
            <a href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf">
            <h2>Whitepaper</h2>
            Read how it all started
            </a>
          </li>
          <li>
            <router-link to="/team">
              <h2>About Us</h2>
              We are pretty handsome.
            </router-link>
          </li>
          <li>
            <router-link to="/imprint">
              <h2>Imprint</h2>
              Terms and Conditions *yaaawn*
            </router-link>
          </li>
        </ul>
        <div class="footer__other">
          <b>
            Discuss the latest News or
            simply join our growing
            Community. We would love
            to here your voice.
          </b>
          <img
            alt="Crowd Control"
            width="80%"
            src="../../assets/logo.svg"
          >
        </div>
      </div>
      <div class="footer__terms">
        <h2></h2>
        If you read this you made it to the end, congrats!
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  mounted () {
  },
  methods: {
    userLoggedIn () {
      console.log(this.$store.getters.loggedIn)
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variables";

  .footer-container {
    margin-top: 5rem;
  }

  footer {
    background-color: $blue;
    // text-shadow: 0.1em 0.1em 0 #0d9393ff;
    text-shadow: 0.1em 0.1em 0 darken($blue, 5%);

    @media (max-width: 480px) {
      padding: 1rem;
    }

    ::selection {
      background-color: $red;
      color: white;
    }
  }

  h2 {
    font-weight: bold;
  }

  .pre-footer {
    position: relative;
    padding: $font-size * 0.5;
    @media (min-width: 480px) {
      max-height: $font-size * 3;
    }
    background-color: $dark-blue;
    text-shadow: 0.1em 0.1em 0 darken($dark-blue, 5%);
  }

  .pre-footer__content {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    margin: auto;
    max-width: 80vw;
    @media (max-width: 480px) {
      max-width: 100%;
      flex-flow: column;
    }

    p {
      margin: 0 1.5rem;
      @media (max-width: 480px) {
        margin: 0.25rem 0.5rem;
      }
    }

    button {
      font-weight: $font-weight;
      font-size: 3rem;
      margin: -0.5em 0;

      @media (max-width: 480px) {
        margin: 0.25rem 0;
        font-size: 2em;
      }
    }
  }

  .footer__content {
    margin: auto;
    padding-top: 4rem;
    @media (max-width: 480px) {
      padding-top: 1rem;
    }
    max-width: 70vw;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      max-width: 100%;
    }
  }

  .footer__terms {
    margin: auto;
    max-width: 70vw;
    width: 100%;
    padding-bottom: 2rem;

    @media (max-width: 480px) {
      max-width: 100%;
    }

    h2 {
      font-size: 2em;
    }
  }

  .footer__menu {
    list-style-type: none;
    a {
      color: $white;
      text-decoration: none;
    }
    h2 {
      font-size: 2em;
    }
    li {
      padding-bottom: 2em;
    }
  }

  .triangle {
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    border-top: 300px solid $orange;
    border-left: 100px solid transparent;

    @media (max-width: 480px) {
      display: none;
    }
  }

  .triangle-pre {
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    right: 150px;
    border-top: $font-size * 3.14 solid #f29121ff;
    border-left: 20px solid transparent;

    @media (max-width: 480px) {
      display: none;
    }
  }

  .square-pre {
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    top: 0;
    border-top: $font-size * 3.14 solid $orange;
    border-left: 150px solid transparent;
    background-color: #f29121ff;

    @media (max-width: 480px) {
      display: none;
    }
  }

  .footer__other > img {
    margin-top: 2rem;
    user-select: none;
    @media (max-width: 480px) {
      display: block;
      margin: 1rem 0;
      width: 100%;
    }
  }

  .footer__copyright {
    border-top: $border-thickness solid $white;
    padding: 1rem 0 1rem 0;
    text-align: center;
  }
</style>

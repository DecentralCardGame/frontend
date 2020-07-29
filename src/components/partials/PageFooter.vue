<template>
  <div class="footer-container">
    <div class="pre-footer">
      <div class="pre-footer-content">
        <p>Ok, ok I have read enough. I am ready to</p>
        <a href="https://discord.gg/yPA3aKe">
          <button>Join</button>
        </a>

        <p>this awesome community and have tons of fun.</p>
      </div>
      <div class="triangle-pre" />
      <div class="square-pre" />
    </div>
    <footer>
      <div class="triangle" />
      <div class="content">
        <ul class="menu">
          <li>
            <router-link to="/about">
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
            <router-link to="/">
              <h2>Gallery</h2>
              See what is out there.
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <h2>Community</h2>
              Get in touch. Not physical, thooo.
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <h2>About Us</h2>
              We are pretty handsome.
            </router-link>
          </li>
        </ul>
        <div class="other">
          <p>
            Discuss the latest News or<br>
            simply join our growing<br>
            Community. We would love<br>
            to here your voice.
          </p>
          <img
            alt="Crowd Control"
            width="80%"
            src="../../assets/logo.svg"
          >
        </div>
      </div>
      <div class="footer-terms">
        <h2>Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageFooter'
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

  img {
    user-select: none;
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

  .pre-footer-content {
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
  }

  .pre-footer-content p {
    margin: 0 1.5rem;
    @media (max-width: 480px) {
      margin: 0.5rem 1.5rem;
    }
  }

  .pre-footer-content button {
    font-weight: $font-weight;
    font-size: 3rem;
    margin: -0.5em 0;

    @media (max-width: 480px) {
      margin: 0;
      font-size: 2em;
    }
  }

  .content {
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

  .footer-terms {
    margin: auto;
    max-width: 70vw;
    width: 100%;
    padding-bottom: 2rem;

    @media (max-width: 480px) {
      max-width: 100%;
    }
  }
  .footer-terms h2 {
    font-size: 2em;
  }

  ul.menu {
    list-style-type: none;
  }

  ul.menu a {
    color: $white;
    text-decoration: none;
  }

  li {
    padding-bottom: 2em;
  }

  h2 {
    font-weight: bold;
  }

  .menu h2 {
    font-size: 2em;
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

  .footer-menu {
    display: flex;
    justify-content: center;
  }

  .footer-menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .footer-menu li {
    float: left;
  }

  .footer-menu li a {
    display: block;
    text-align: center;
    padding: 1rem 1rem;
    text-decoration: none;
  }

  .other {
    font-size: 2em;
  }

  .other > img {
    margin-top: 2rem;
  }

  .footer-copyright {
    border-top: $border-thickness solid $white;
    padding: 1rem 0 1rem 0;
    text-align: center;
  }
</style>

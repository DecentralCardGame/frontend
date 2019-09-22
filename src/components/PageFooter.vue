<template>
  <div class="footer-container">
    <div class="pre-footer">
      <div class="pre-footer-content">
        <p>Ok, ok I have read enough. I am ready to</p>
      </div>
    </div>
    <footer>
      <div class="triangle"></div>
      <div class="content">
        <ul class="menu">
          <li>
            <h2>The Game</h2>
            Rules, Ideas and historical Context.
          </li>
          <li>
            <h2>Card Creator</h2>
            Get creative and rule the world.
          </li>
          <li>
            <h2>Gallery</h2>
            See what is out there.
          </li>
          <li>
            <h2>Community</h2>
            Get in touch. Not physical, thooo.
          </li>
          <li>
            <h2>About Us</h2>
            We are pretty handsome.
          </li>
        </ul>
        <div class="other">
          <p>Discuss the latest News or<br>
          simply join our growing<br>
          Community. We would love<br>
            to here your voice.</p>
          <img width="80%" align="center" src="../assets/logo.svg">
        </div>
        <div>
          <h2>Terms and Conditions</h2>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,</p>
        </div>
      </div>
      <div class="footer-menu footer-menu-sm">
        <ul>
          <li>
            <a href="https://github.com/DecentralCardGame" target="_blank"><i class="fab fa-github"></i></a>
          </li>
          <li>
            <a href="https://t.me/DecentralCardNetwork" target="_blank"><i class="fab fa-telegram"></i></a>
          </li>
          <li>
            <a href="#" target="_blank"><i class="fab fa-discord"></i></a>
          </li>
        </ul>
      </div>
      <div class="footer-menu">
        <ul>
          <li>
            <a href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf" target="_blank"><i class="fas fa-file"></i> Whitepaper</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-users"></i> Team</a>
          </li>
        </ul>
      </div>
      <div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style scoped>
  .footer-container {
    margin-top: 1em;
  }

  footer {
    background-color: #12d1d1ff;
    text-shadow: 0.1em 0.1em 0 #0d9393ff;
  }

  .pre-footer {
    padding: 0.7em;
    background-color: #001433ff;
    text-shadow: 1px 1px 0 #12d1d1ff;
  }

  .pre-footer-content {
    margin: auto;
    max-width: 70vw;
  }

  .content {
    margin: auto;
    padding-top: 4em;
    max-width: 70vw;
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
  }

  ul.menu {
    list-style-type: none;
  }

  li {
    padding-bottom: 2em;
  }

  .menu h2 {
    font-size: 200%;
  }

  .triangle {
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    border-top: 300px solid #f29121ff;
    border-left: 100px solid transparent;
  }

  .footer-menu {
    display: flex;
    justify-content: center;
  }

  .footer-menu-sm i {
    font-size: 2em;
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
    padding: 14px 16px;
    text-decoration: none;
  }

  .other {
    font-size: 200%;
  }

  .other > img {
    margin-top: 1em;
  }

  .footer-copyright {
    border-top: 1px solid white;
    padding: 1em 0 1em 0;
    text-align: center;
  }
</style>

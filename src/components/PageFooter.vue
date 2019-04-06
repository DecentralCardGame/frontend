<template>
<footer>
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
  <div class="footer-copyright">
    &copy; 2019
  </div>
</footer>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style scoped>
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

  .footer-copyright {
    border-top: 1px solid white;
    padding: 1em 0 1em 0;
    text-align: center;
  }
</style>

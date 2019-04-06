<template>
  <nav>
    <span class="lt"></span><span class="rt"></span><span class="rb"></span><span class="lb"></span>

    <ul>
      <li><router-link to="/">Gallery</router-link></li>
      <li><router-link to="/newcard">New Card</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PageMenu'
}
</script>

<style scoped>
  nav {
    position: relative;
  }
  ul {
    width: auto;
    background-color: rgb(0, 58, 86);
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover {
    background-color: rgb(0, 108, 161);
  }
</style>

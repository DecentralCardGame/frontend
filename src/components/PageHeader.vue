<template>
  <header>
    <span class="lt"></span><span class="rt"></span><span class="rb"></span><span class="lb"></span>
    <img src="../assets/logo.png" class="logo" alt="Decentral Card Network Logo  ">
    <h1>Decentral Card Network</h1>
  </header>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped>
  header {
    display: flex;
    padding: 10px 15px;
    margin: 30px 40px 30px 30px;
    justify-content: center;
    user-select: none;
    cursor: default;
    position: relative;
  }
  .logo {
    display: block;
    height: 52px;
    margin-right: 20px;
  }
  h1 {
    display: block;
    padding: 0;
    margin: 1em 0;
    line-height: 1em;
    font-weight: 700;
    font-size: 28px;
  }
</style>

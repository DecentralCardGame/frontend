<template>
  <header>
    <p><a href="https://discord.gg/yPA3aKe" id="Discordlink">Discuss the latest News or simply join our growing Community. We would love to hear your voice.</a></p>
    <router-link v-if="$store.getters.loggedIn" to="/me"><button>My Account</button></router-link>
  </header>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped lang="scss">
  @import "src/assets/styles/mixins";

  header {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-gap: 2em;
    margin-left: 2em;
    margin-right: 5em;
  }
  p {
    width: auto;
    width: auto;
    background-color: #001433ff;
    text-align: center;
    padding: 0.5em;
    border-right: 5px solid white;
    box-shadow: 5px 5px 0 white;
  }

  @media (max-width: 480px) {
    header {
      grid-template-columns: 1fr;
      grid-gap: 0;
      margin-left: 0;
      margin-right: 0;
    }
    p {
      background-color: #001433ff;
      text-align: center;
      padding: 0.5em;
      border-right: 0 solid white;
      box-shadow: 0 5px 0 white;
    }
  }
</style>

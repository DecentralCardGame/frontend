<template>
  <header>
    <a href="https://discord.gg/yPA3aKe" id="Discordlink">
      Discuss the latest News or simply join our growing Community. We would love to hear your voice.
    </a>
    <router-link v-if="$store.getters.loggedIn" to="/me"><button>My Account</button></router-link>
  </header>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variables";

  header {
    background-color: $dark-blue;
    padding: $font-size * 0.5;
    text-align: center;
    border-bottom: $border-thickness-bold solid $white;
  }
</style>

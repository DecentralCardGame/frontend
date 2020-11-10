<template>
  <header>
    <a
      id="Discordlink"
      href="https://discord.gg/ZKKbhUs"
    >
      Discuss the latest News or simply join our growing Community <b>Discord</b>. We would love to hear your voice.
    </a>
    <router-link
      class="account-box"
      v-if="$store.getters.loggedIn"
      to="/me"
    >
      <button>My Account ({{ getUserCredits }} Credits)</button>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
    mounted () {
      //this.$cardChain.updateUserCredits()
    },
    methods: {
    },
    computed: {
      getUserCredits () {
        return this.$store.getters.getUserCredits
      }
    }
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

  .account-box {
    position: absolute;
    top: 0;
    right: 2rem;
  }
</style>

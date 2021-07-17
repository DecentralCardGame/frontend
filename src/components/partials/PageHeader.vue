<template>
  <header>
    <a
      id="Discordlink"
      href="https://discord.gg/ZKKbhUs"
    >
      Discuss the latest News or simply join our growing Community
      <picture>
        <source type="image/webp" srcset="../../assets/icon/discord.webp">
        <source type="image/png" srcset="../../assets/icon/discord.png">
        <img 
          src="../../assets/icon/discord.png"
          style="display:inline; max-height:20px;transform:translateY(4px);"
          alt="Image description"
        >
      </picture>
      <b>Discord</b>. We would love to hear your voice.
    </a>
    <router-link
      v-if="$store.getters.loggedIn"
      class="account-box"
      to="/me"
    >
      <button>My Account ({{ getUserCredits }} Credits)</button>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
    computed: {
      getUserCredits () {
        return this.$store.getters.getUserCredits
      }
    },
    mounted () {
      //this.$cardChain.updateUserCredits()
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variables";

  header {
    background-color: $background-separator;
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

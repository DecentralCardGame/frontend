<template>
  <header>
    <a
      id="Discordlink"
      href="https://discord.gg/ZKKbhUs"
    >
      Discuss the latest News or simply join our growing Community
      <picture>
        <source
          type="image/webp"
          srcset="../../assets/icon/discord.webp"
        >
        <source
          type="image/png"
          srcset="../../assets/icon/discord.png"
        >
        <img
          src="../../assets/icon/discord.png"
          style="display:inline; max-height:20px;transform:translateY(4px);"
          alt="Image description"
        >
      </picture>
      <b>Discord</b>. We would love to hear your voice.
    </a>
    <!--router-link
      v-if="$store.getters['getLoggedIn']"
      class="account-box"
      to="/me"
    >
      <button>My Account ({{ getUserCredits }} Credits)</button>
    </router-link-->
    <SpWallet
      ref="wallet"
      class="wallet--local"
      type="button"
      @dropdown-opened="$refs.menu.closeDropdown()"
    />
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
}
</script>

<style scoped lang="scss">
  @import "../../scss/variables";

  .wallet--local {
    position: absolute;
    color: black;
  }

  .sp-wallet-menu-item {
    color: black;
  }

  .sp-text {
    color: black;
  }


  header {
    background-color: $background-separator;
    padding: $font-size * 0.5;
    text-align: center;
    border-bottom: $border-thickness-bold solid $white;
  }

  .account-box {
    color: black;
    position: absolute;
    top: 0;
    right: 2rem;
  }
</style>

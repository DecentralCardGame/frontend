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
      v-if="$store.getters.loggedIn || getAddress()"
      to="/me"
    >
      <button>My Account ({{ getUserCredits }} Credits)</button>
    </router-link>
  </header>
</template>

<script>
import { getAccInfo } from '../utils/cardChain.js'
import { creditsFromCoins } from '../utils/utils.js'

export default {
  name: 'PageHeader',
    mounted () {
      console.log('YES')
      let address = this.getAddress()
      if (address) {
        getAccInfo(this.$http, localStorage.address)
        .then(acc => {
          
          this.creditsAvailable = creditsFromCoins(acc.coins)
          this.$store.commit('setUserCredits', this.creditsAvailable)    
          console.log(this.creditsAvailable, '=>', this.$store.getters.getUserCredits)
        })
      }
    },
    methods: {
      getAddress() {
        return localStorage.address
      }
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

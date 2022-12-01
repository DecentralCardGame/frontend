<template>
  <header>
    <div
      class="keplrButton"
      :class="{ 'clickable-option': true,}"
      @click="keplrWalletLogin(true)"
    >
      <img
        src="../../assets/icon/keplr-logo.png"
      >
    </div>
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

    <HCaptchaModal
      v-show="showCaptcha"
      @close="closeCaptcha"
    />

    <SpWallet
      ref="wallet"
      class="wallet--local"
      type="button"
      @click="keplrWalletLogin(false)"
      @dropdown-opened="$refs.menu.closeDropdown()"
    />
  </header>
</template>

<script>
import HCaptchaModal from '@/components/modals/HCaptchaModal.vue'

export default {
  name: 'PageHeader',
  components: {
    HCaptchaModal
  },
  data() {
    return {
      showKeplr: true,
      showCaptcha: false,
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
      this.setLoginStatus()

      if (this.$store.getters["getLoggedIn"]) {
        this.notifyInfo('Login', 'You are now logged in.')

        // first we check if the blockchain gives proper response
        this.$cardChain.getGameInfo()
          .then(res => {
            // then we check if the user exists and if not, we go through the faucet process
            this.$cardChain.checkIfCardchainUserExists(this.$store.getters['common/wallet/address'])
              .then(user => {
                return "no faucet necessary"
              })
              .catch(res => {
                this.showCaptcha = true
              })
          })
          .catch(res => {
            console.error(res)
            this.notifyFail("FAILED", "No connection to the blockchain...")
          })

        /*
        this.$cardChain.updateUserCredits()
        .then(credits => {
          console.log("credits:", credits)
          if (credits < 1) {
            console.log("using faucet")
            this.showCaptcha = true
          } else {
            return "no faucet necessary"
          }
        })
        .catch(err => {
          this.notifyFail("WTF", "Something went wrong in the login process.")
          console.error(err)
        })
        */

      } else {
        this.notifyInfo('Logout', 'You have logged out.')
      }
    }
  },
  methods: {
    closeCaptcha() {
      this.showCaptcha = false
    },
    setLoginStatus() {
      console.log('wallet name, adress', this.$store.getters['common/wallet/address'])
      if (this.$store.getters['common/wallet/walletName'] != null) {
        this.$store.commit('setLoggedIn', true)
        console.log("loggedin?", this.$store.getters["getLoggedIn"])
      } else {
        this.$store.commit('setLoggedIn', false)
        console.log("loggedin?", this.$store.getters["getLoggedIn"])
      }
    },
    async keplrWalletLogin(doAllert) {
      if (!doAllert) {
        if (this.showKeplr) {
          this.showKeplr = false
        } else {
          return
        }
      }
      if (!window.getOfflineSigner || !window.keplr) {
        if (doAllert) {
          alert("Please install keplr extension");
        }
      } else {
        if (window.keplr.experimentalSuggestChain) {
          try {
            await window.keplr.experimentalSuggestChain({
              chainId: "Cardchain",
              chainName: "Crowdcontrol Testnet",
              rpc: "https://cardchain.crowdcontrol.network/tendermint/",
              rest: "https://cardchain.crowdcontrol.network/cosmos",
              stakeCurrency: {
                coinDenom: "bpf",
                coinMinimalDenom: "ubpf",
                coinDecimals: 6,
                // coinGeckoId: ""
              },
              bip44: {
                coinType: 118,
              },
              bech32Config: {
                bech32PrefixAccAddr: "cc",
                bech32PrefixAccPub: "cc",
                bech32PrefixValAddr: "cc",
                bech32PrefixValPub: "cc",
                bech32PrefixConsAddr: "cc",
                bech32PrefixConsPub: "cc"
              },
              currencies: [{
                coinDenom: "credits",
                coinMinimalDenom: "ucredits",
                coinDecimals: 6,
              }, {
                coinDenom: "bpf",
                coinMinimalDenom: "ubpf",
                coinDecimals: 6,
                // coinGeckoId: ""
              }],
              feeCurrencies: [{
                coinDenom: "credits",
                coinMinimalDenom: "ucredits",
                coinDecimals: 6,
              }, {
                coinDenom: "bpf",
                coinMinimalDenom: "ubpf",
                coinDecimals: 6,
                // coinGeckoId: ""
              }],
              coinType: 118,
              gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04
              }
            });
          } catch {
            console.log("Failed to suggest the chain");
          }
        } else {
          alert("Please use the recent version of keplr extension");
        }
      }

      const chainId = "Cardchain";
      await window.keplr.enable(chainId);
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../scss/variables";

  .wallet--local {
    position: absolute;
    top: 0;
    transform: scale(0.9);
    color: black;
  }

  .sp-wallet-menu-item {
    color: black;
  }

  .sp-text {
    color: black;
  }

  .keplrButton {
    display:inline;
    margin-right: 3px;

    img {
      background-color: #7079d9;
      border-radius: 3px;
      padding-right: 3px;
      display:inline;
      max-height:20px;
      transform:translateY(4px);
    }
  }

  .keplrButton:hover {
    cursor: pointer;
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

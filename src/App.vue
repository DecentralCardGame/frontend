<template>
  <div
    v-if="initialized"
    id="app"
    tabindex="-1"
    @auxclick="handleAnyInput"
    @click="handleAnyInput"
    @keyup.enter="handleAnyInput"
    @keyup.esc="handleAnyInput"
  >
    <AppLayout>
      <router-view />
    </AppLayout>

    <notifications
      group="bottom-right-notification"
      position="bottom right"
      class="notification"
    />
  </div>
</template>

<script>
import './scss/main.scss'
import '@starport/vue/lib/starport-vue.css'
//import Sidebar from './components/Sidebar'

import AppLayout from './layouts/AppLayout.vue'
import {
  creditsFromCoins,
} from "@/components/utils/utils.js";

import { SigningCosmosClient } from '@cosmjs/launchpad'
import {
    DirectSecp256k1HdWallet
} from '@cosmjs/proto-signing'

import {
    assertIsBroadcastTxSuccess,
    SigningStargateClient,
} from '@cosmjs/stargate'

export default {
  name: 'CrowdControlApp',
  components: {
    AppLayout
  },
  data() {
    return {
      initialized: false,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
      this.setLoginStatus()

      if (this.$store.getters["getLoggedIn"]) {
        this.notifyInfo('Login', 'You are now logged in.')
        this.$cardChain.updateUserCredits()
        .then(credits => {
          console.log("credits:", credits)
          if (credits < 1) {
            console.log("using faucet")
            return this.$cardChain.useFaucet()
            .then(async (faucetres) => {
              console.log("faucetres", faucetres)
              let active = -1
              let count = 0
              while (active === -1 && count < 100) {
                  active = await this.$cardChain.updateUserCredits();
                  count++
              }
              if (active === -1) {
                throw new Error('Faucet does not work.')
              }
              console.log("yes", active)
              return this.$cardChain.registerAccTx(this.$store.getters['common/wallet/walletName'])
            })
            .then(register => {
              if (register.code === 0) {
                this.notifySuccess("Great Success!", "Registering was successful.")
              }
              else {
                this.notifyFail("EPIC FAIL", "Register did not work.")
                console.error(register)
              }
            })
          } else {
            return "no faucet necessary"
          }
        })
        .catch(err => {
          this.notifyFail("WTF", "Something went wrong in the login process.")
          console.error(err)
        })
      } else {
        this.notifyInfo('Logout', 'You have logged out.')
      }
    }
  },
  async created() {
    this.$cardChain.bindVue(this)
    await this.$store.dispatch('common/env/init')
    this.initialized = true

    console.log("initialized?", this.initialized)
  },
  mounted () {
    this.setLoginStatus();
    console.log("store", this.$store)
    window.onload = async () => {
        // Keplr extension injects the offline signer that is compatible with cosmJS.
        // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
        // And it also injects the helper function to `window.keplr`.
        // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
        if (!window.getOfflineSigner || !window.keplr) {
            alert("Please install keplr extension");
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {
                    // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
                    // cosmoshub-3 is integrated to Keplr so the code should return without errors.
                    // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
                    // If the user approves, the chain will be added to the user's Keplr extension.
                    // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
                    // If the same chain id is already registered, it will resolve and not require the user interactions.
                    await window.keplr.experimentalSuggestChain({
                        // Chain-id of the Osmosis chain.
                        chainId: "Cardchain",
                        // The name of the chain to be displayed to the user.
                        chainName: "Crowdcontrol mainnet",
                        // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
                        rpc: "https://cardchain.crowdcontrol.network/tendermint/",
                        // REST endpoint of the chain.
                        rest: "https://cardchain.crowdcontrol.network/cosmos",
                        // Staking coin information
                        stakeCurrency: {
                            // Coin denomination to be displayed to the user.
                            coinDenom: "bpf",
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: "ubpf",
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        },
                        // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
                        // The 'stake' button in Keplr extension will link to the webpage.
                        // walletUrlForStaking: "",
                        // The BIP44 path.
                        bip44: {
                            // You can only set the coin type of BIP44.
                            // 'Purpose' is fixed to 44.
                            coinType: 118,
                        },
                        // Bech32 configuration to show the address to user.
                        // This field is the interface of
                        // {
                        //   bech32PrefixAccAddr: string;
                        //   bech32PrefixAccPub: string;
                        //   bech32PrefixValAddr: string;
                        //   bech32PrefixValPub: string;
                        //   bech32PrefixConsAddr: string;
                        //   bech32PrefixConsPub: string;
                        // }
                        bech32Config: {
                            bech32PrefixAccAddr: "cc",
                            bech32PrefixAccPub: "cc",
                            bech32PrefixValAddr: "cc",
                            bech32PrefixValPub: "cc",
                            bech32PrefixConsAddr: "cc",
                            bech32PrefixConsPub: "cc"
                        },
                        // List of all coin/tokens used in this chain.
                        currencies: [{
                            // Coin denomination to be displayed to the user.
                            coinDenom: "bpf",
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: "ubpf",
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        }, {
                            // Coin denomination to be displayed to the user.
                            coinDenom: "credits",
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: "ucredits",
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        }],
                        // List of coin/tokens used as a fee token in this chain.
                        feeCurrencies: [{
                            // Coin denomination to be displayed to the user.
                            coinDenom: "bpf",
                            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                            coinMinimalDenom: "ubpf",
                            // # of decimal points to convert minimal denomination to user-facing denomination.
                            coinDecimals: 6,
                            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                            // coinGeckoId: ""
                        },],
                        // (Optional) The number of the coin type.
                        // This field is only used to fetch the address from ENS.
                        // Ideally, it is recommended to be the same with BIP44 path's coin type.
                        // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
                        // So, this is separated to support such chains.
                        coinType: 118,
                        // (Optional) This is used to set the fee of the transaction.
                        // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
                        // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                        // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                        gasPriceStep: {
                            low: 0.01,
                            average: 0.025,
                            high: 0.04
                        }
                    });
                } catch {
                    alert("Failed to suggest the chain");
                }
            } else {
                alert("Please use the recent version of keplr extension");
            }
        }

        const chainId = "Cardchain";

        // You should request Keplr to enable the wallet.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        // If you don't request enabling before usage, there is no guarantee that other methods will work.
        await window.keplr.enable(chainId);

        const offlineSigner = window.getOfflineSigner(chainId);

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();

        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        const cosmJS = new SigningCosmosClient(
            "https://cardchain.crowdcontrol.network/tendermint/",
            accounts[0].address,
            offlineSigner,
        );

        //document.getElementById("address").append(accounts[0].address);
    };
  },
  errorCaptured(err) {
    console.log(err)
    return false
  },
  methods: {
    handleAnyInput(event) {
      this.$store.commit(
        "setLastInputEvent",
        event
      )
    },
    setLoginStatus() {
      console.log('wallet name, adress', this.$store.getters['common/wallet/walletName'], this.$store.getters['common/wallet/address'])
      if (this.$store.getters['common/wallet/walletName'] != null) {
        this.$store.commit('setLoggedIn', true)
        console.log("loggedin?", this.$store.getters["getLoggedIn"])
      } else {
        this.$store.commit('setLoggedIn', false)
        console.log("loggedin?", this.$store.getters["getLoggedIn"])
      }
    },
  }

}

</script>

<style lang="scss">
@import './scss/variables';

#app {
  background-image: url('./assets/background.svg');
  background-size: 100% auto;
}

.notification--info {
  border-left: $border-thickness-bold solid $black !important;
  background: $notification-info !important;
}
.notifications {
  width: 450px !important;
}
.notification {
  padding: $font-size*0.5;
  margin: 0 $font-size*0.5 $font-size*0.5;
  font-size: $font-size;
  color: $white;
}
.notification--success {
  border-left: $border-thickness-bold solid darken($notification-success, 10%) !important;
  background: $notification-success !important;
}
.notification--alert {
  border-left: $border-thickness-bold solid darken($notification-fail, 10%) !important;
  background: $notification-fail !important;
}
@font-face {
  font-family: 'Museo900-Regular';
  font-weight: normal;
  font-style: normal;
  src: url('~@/assets/fonts/museo900regular.woff') format('woff');
}
@font-face {
  font-family: 'Museo700-Regular';
  font-weight: normal;
  font-style: normal;
  src: url('~@/assets/fonts/Museo700-Regular-webfont.woff2') format('woff2'),
    url('~@/assets/fonts/Museo700-Regular-webfont.woff') format('woff');
}
@font-face {
  font-family: 'Museo500-Regular';
  src: url('~@/assets/fonts/Museo500-Regular-webfont.woff2') format('woff2'),
    url('~@/assets/fonts/Museo500-Regular-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEz0dL_nz.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzQdL_nz.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzwdL_nz.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzMdL_nz.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEz8dL_nz.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEz4dL_nz.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzAdLw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc3CsTKlA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc-CsTKlA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc2CsTKlA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc5CsTKlA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc1CsTKlA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc0CsTKlA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc6CsQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xFIzIFKw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xMIzIFKw.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xEIzIFKw.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xLIzIFKw.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xHIzIFKw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xGIzIFKw.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc3CsTKlA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc-CsTKlA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc2CsTKlA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc5CsTKlA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc1CsTKlA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc0CsTKlA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc6CsQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic3CsTKlA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic-CsTKlA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic2CsTKlA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic5CsTKlA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic1CsTKlA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic0CsTKlA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic6CsQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc3CsTKlA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc-CsTKlA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc2CsTKlA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc5CsTKlA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc1CsTKlA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc0CsTKlA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc6CsQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxFIzIFKw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxMIzIFKw.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxEIzIFKw.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxLIzIFKw.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxHIzIFKw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxGIzIFKw.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxIIzI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'),
    url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>

<template>
  <header>
    <div
      class="keplrButton"
      :class="{ 'clickable-option': true,}"
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
      v-show="state.showCaptcha"
      @close="closeCaptcha"
    />

    <div
      class="wallet--local"
    >
      <IgntAcc />
    </div>
  </header>
</template>

<script setup lang=ts>
import HCaptchaModal from "@/components/modals/HCaptchaModal.vue";
import IgntAcc from "@/components/IgntAcc.vue";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { reactive, ref, watch } from "vue";
import { useCardchainInfo } from "@/def-composables/useCardchainInfo";
import { useQuery } from "@/def-composables/useQuery";

const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { info } = useCardchainInfo();
const { queryQUser } = useQuery();

watch(address, () => {
  if (loggedIn) {
    //this.notifyInfo("Login", "You are now logged in.");

    // first we check if the blockchain gives proper response
    queryQUser(address.value)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.status === 500) {
        state.showCaptcha = true;
        console.log("yes")
      } else {
        throw err
      }
    })

    //this.$cardChain.getGameInfo()
     // .then(res => {
        // then we check if the user exists and if not, we go through the faucet process
       // this.$cardChain.checkIfCardchainUserExists(this.$store.getters["common/wallet/address"])
         // .then(user => {
           // return "no faucet necessary";
          //})
          //.catch(res => {
            //this.showCaptcha = true;
          //});
      //})
      //.catch(res => {
        //console.error(res);
        //this.notifyFail("FAILED", "No connection to the blockchain...");
      //})
    }
 })

// state
const state = reactive({
  showKeplr: true,
  showCaptcha: false
})

const closeCaptcha = () => {
  state.showCaptcha = false;
}

</script>

<style scoped lang="scss">
@import "../../scss/variables";

.wallet--local {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 10%;
  color: black;
}

.sp-wallet-menu-item {
  color: black;
}

.sp-text {
  color: black;
}

.keplrButton {
  display: inline;
  margin-right: 3px;

  img {
    background-color: #7079d9;
    border-radius: 3px;
    padding-right: 3px;
    display: inline;
    max-height: 20px;
    transform: translateY(4px);
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

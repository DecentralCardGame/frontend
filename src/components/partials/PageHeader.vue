<template>
  <header>
    <a id="Discordlink" href="https://discord.gg/ZKKbhUs">
      Discuss the latest News or simply join our growing Community
      <picture>
        <source type="image/webp" srcset="../../assets/icon/discord.webp">
        <source type="image/png" srcset="../../assets/icon/discord.png">
        <img src="../../assets/icon/discord.png" style="display:inline; max-height:20px;transform:translateY(4px);"
          alt="Image description">
      </picture>
      <b>Discord</b>. We would love to hear your voice.
    </a>

    <HCaptchaModal v-show="state.showCaptcha" @close="closeCaptcha" />

    <div class="wallet--local">
      <IgntAcc />
    </div>
  </header>
</template>

<script setup lang="ts">
import HCaptchaModal from "@/components/modals/HCaptchaModal.vue";
import IgntAcc from "@/components/IgntAcc.vue";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { reactive, watch } from "vue";
import { useQuery } from "@/def-composables/useQuery";

const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { queryQUser } = useQuery();

watch(address, () => {
  if (loggedIn) {
    queryQUser(address.value)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
        if (address.value != "")
          state.showCaptcha = true;
      });
  }
});

// state
const state = reactive({
  showKeplr: true,
  showCaptcha: false
});

const closeCaptcha = () => {
  state.showCaptcha = false;
};

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

header {
  background-color: $background-separator;
  padding: $font-size * 0.5;
  text-align: center;
  border-bottom: $border-thickness-bold solid $white;
}
</style>

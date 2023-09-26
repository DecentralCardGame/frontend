<template>
  <div class="justify-center text-center ccbutton">
    <h2>Gameclient authorization</h2>
    <p class="text-red-400 font-bold">
      Important!: Only if you've been prompted by the gameclient to open this
      page, ELSE close this page!
    </p>
    <div class="p-5">
      <div v-if="loggedIn">
        <p>Authenticate gameclient?</p>
        <br />
        <button class="ccbutton" type="button" v-on:click="sendTransActions">
          Authenticate
        </button>
      </div>
      <div v-else>
        <p>Please log in to authenticate</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useTx } from "@/def-composables/useTx";
import { useAddress } from "@/def-composables/useAddress";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { validAddress } from "@/utils/validation";
import { Coin } from "@/model/Coin";

const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { grantAuthz, send } = useTx();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (
    !route.params.authzAddress ||
    !validAddress(route.params.authzAddress.toString())
  ) {
    redirect();
  }
});

const sendTransActions = () => {
  send(
    [new Coin("ucredits", 11).toCompatCoin()],
    route.params.authzAddress.toString(),
    () => {
      grantAuthz(
        address.value,
        route.params.authzAddress.toString(),
        "/DecentralCardGame.cardchain.cardchain.MsgBuyCollection",
        console.log,
        console.log
      );
    },
    console.log
  );
};

const redirect = () => {
  router.push({ name: "NotFound" });
};
</script>
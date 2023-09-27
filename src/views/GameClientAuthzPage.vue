<template>
  <div class="text-center ccbutton">
    <h2>Gameclient authorization</h2>
    <p class="text-red-400 font-bold">
      Important!: Only if you've been prompted by the gameclient to open this
      page, ELSE close this page!
    </p>
    <div class="p-5 flex justify-center">
      <div v-if="loggedIn">
        <div v-if="state.currentState == CurrentState.NONE">
          <p>Authenticate gameclient?</p>
          <br />
          <button class="ccbutton" type="button" v-on:click="sendTransActions">
            Authenticate
          </button>
        </div>
        <div v-else-if="state.currentState == CurrentState.LOADING">
          <p>Authenticating...</p>
          <img alt="loading spinner" src="spinner.svg" class="w-40 p-5" />
        </div>
        <div v-else-if="state.currentState == CurrentState.DONE">
          <p>Gameclient Authenticated!</p>
          <p>You can now close this page</p>
        </div>
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
import { onMounted, reactive } from "vue";
import { validAddress } from "@/utils/validation";
import { Coin } from "@/model/Coin";

enum CurrentState {
  NONE,
  LOADING,
  DONE,
}

const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { authzGameclient } = useTx();
const route = useRoute();
const router = useRouter();

const initialState: {
  currentState: CurrentState;
} = {
  currentState: CurrentState.NONE,
};

const state = reactive(initialState);

onMounted(() => {
  if (
    !route.params.authzAddress ||
    !validAddress(route.params.authzAddress.toString())
  ) {
    redirect();
  }
});

const sendTransActions = () => {
  state.currentState = CurrentState.LOADING;
  authzGameclient(
    route.params.authzAddress.toString(),
    () => {
      state.currentState = CurrentState.DONE;
    },
    console.log
  );
};

const redirect = () => {
  router.push({ name: "NotFound" });
};
</script>
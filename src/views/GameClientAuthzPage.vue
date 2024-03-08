<template>
  <FadeTeaser class="text-center">
    <div class="absolute top-20 xl:py-20 left-0 right-0">
      <div class="flex flex-col text-center">
        <p class="text-6xl text-cc-red font-bold">Authenticate Gameclient</p>
        <div class="text-black text-3xl pt-4">
          <p>
            <b>Important:</b> Only if you've been prompted by the gameclient
          </p>
          <p>to open this page, ELSE close this page!</p>
          <br />
          <div v-if="loggedIn" class="flex justify-center">
            <div v-if="state.currentState == CurrentState.NONE">
              <p>Authenticate gameclient?</p>
              <br />
              <BaseCCButton
                class="text-lg"
                @click="sendTransActions"
                :type="ButtonType.RED"
              >
                Authenticate
              </BaseCCButton>
            </div>
            <div v-else-if="state.currentState == CurrentState.LOADING">
              <p>Authenticating...</p>
              <img alt="loading spinner" :src="spinner" class="w-40 p-5" />
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
    </div>
  </FadeTeaser>
</template>
<script setup lang="ts">
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useTx } from "@/def-composables/useTx";
import { useAddress } from "@/def-composables/useAddress";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import { validAddress } from "@/utils/validation";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import FadeTeaser from "@/components/elements/FadeTeaser.vue";
import spinner from "@/assets/spinner.svg";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

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
    console.log,
  );
};

const redirect = () => {
  router.push({ name: "NotFound" });
};
</script>

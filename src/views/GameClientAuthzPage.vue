<template>
  <FadeTeaserSmall class="text-center">
    <HeadingContentComponent heading-class="text-cc-red">
      <template #heading>
        Authenticate Gameclient
      </template>
      <template #content>
        <p><b>Important:</b> Only if you've been prompted by the gameclient</p>
        <p>to open this page, ELSE close this page!</p>
        <br>
        <div
          v-if="loggedIn"
          class="flex justify-center"
        >
          <div v-if="state.currentState == CurrentState.NONE">
            <p>Authenticate gameclient?</p>
            <br>
            <BaseCCButton
              class="text-lg"
              :type="ButtonType.RED"
              @click="sendTransActions"
            >
              Authenticate
            </BaseCCButton>
          </div>
          <div v-else-if="state.currentState == CurrentState.LOADING">
            <p>Authenticating...</p>
            <img
              alt="loading spinner"
              :src="spinner"
              class="w-40 p-5"
            >
          </div>
          <div v-else-if="state.currentState == CurrentState.DONE">
            <p>Gameclient Authenticated!</p>
            <p>You can now close this page</p>
          </div>
        </div>
        <div v-else>
          <p>Please log in to authenticate</p>
          <SignupComponent />
        </div>
      </template>
    </HeadingContentComponent>
  </FadeTeaserSmall>
</template>
<script setup lang="ts">
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useTx } from "@/def-composables/useTx";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import { validAddress } from "@/utils/validation";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import FadeTeaserSmall from "@/components/elements/Teaser/FadeTeaserSmall.vue";
import spinner from "@/assets/spinner.svg";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";
import SignupComponent from "@/components/elements/Login/SignupComponent.vue";

enum CurrentState {
  NONE,
  LOADING,
  DONE,
}

const { loggedIn } = useLoggedIn();
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

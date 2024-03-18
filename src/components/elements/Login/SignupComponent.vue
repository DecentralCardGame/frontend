<template>
  <div>
    <BaseCCButton v-if="!isSignUpRequired" @click="login">
      Login with keplr
    </BaseCCButton>
    <div v-else>
      <div v-if="isKeplrAvailable" class="flex flex-col justify-center">
        <p class="p-7">You have to sign up first</p>
        <vue-hcaptcha
          :sitekey="state.siteKey"
          class="mx-auto"
          @verify="onVerify"
        />
      </div>
      <div v-else>
        <p class="p-7">
          To log in you first need download and install the
          <a href="https://www.keplr.app" class="underline">keplr wallet</a>
          browser extension
        </p>
        <a href="https://www.keplr.app/download" class="mx-auto">
          <BaseCCButton :type="ButtonType.TEAL"> Download Keplr</BaseCCButton>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import useKeplr from "@/def-composables/useKeplr";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import { useLogin } from "@/def-composables/useLogin";
import { onMounted, reactive } from "vue";
import { env } from "@/env";
import SignupComponent from "@/components/elements/Login/SignupComponent.vue";

const { isKeplrAvailable } = useKeplr();
const { checkSignUpRequired, login, isSignUpRequired, onVerify } = useLogin();

const initialState: {
  siteKey: string;
} = {
  siteKey: env.faucetSiteKey,
};

const state = reactive(initialState);

onMounted(checkSignUpRequired);
</script>

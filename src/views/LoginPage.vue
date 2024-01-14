<template>
  <div class="bg-black flex flex-col h-[80vh] sm:h-[85vh]">
    <div class="text-center my-auto">
      <div class="-mt-40">
        <h2 class="text-white text-5xl font-bold p-7">
          {{ isSignUpRequired ? "Sign up" : "Log in" }}
        </h2>
        <BaseCCButton v-if="!isSignUpRequired" @click="login"
          >Login with keplr
        </BaseCCButton>
        <div v-else>
          <div v-if="isKeplrAvailable" class="flex flex-col justify-center">
            <p class="text-white p-7">You have to sign up first</p>
            <vue-hcaptcha
              :sitekey="state.siteKey"
              @verify="onVerify"
              class="mx-auto"
            />
          </div>
          <div v-else>
            <p class="text-white p-7">
              To log in you first need download and install the
              <a href="https://www.keplr.app" class="underline">keplr wallet</a>
              browser extension
            </p>
            <a href="https://www.keplr.app/download" class="mx-auto">
              <BaseCCButton :type="ButtonType.TEAL">
                Download Keplr</BaseCCButton
              >
            </a>
          </div>
        </div>
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

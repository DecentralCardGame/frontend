<template>
  <button
    class="text-white font-bold uppercase flex hover:underline my-auto"
    @click="tryLogin"
  >
    <img
      class="h-8 pr-4"
      :src="loggedIn ? loggedInProfilePic : Profile"
      alt="PP"
    />
    <a class="my-auto">{{isSignUpRequired ? "Log in / Sign up" : loggedIn ? "Profile" : "Login"}}</a>
  </button>
</template>

<script setup lang="ts">
import Profile from "@/assets/figma/Profile.png";
import { useProfilePic } from "@/def-composables/useProfilePic";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useLogin } from "@/def-composables/useLogin";
import {onMounted} from "vue";

const { loggedInProfilePic } = useProfilePic();
const { loggedIn } = useLoggedIn();
const { tryLogin, isSignUpRequired, checkSignUpRequired } = useLogin();

onMounted(() => {
  checkSignUpRequired().then(value => {
    if (!value) {
      tryLogin()
    }
  })
})
</script>

<template>
  <button
    class="text-white font-bold uppercase flex hover:underline my-auto"
    @click="tryLogin"
  >
    <ProfilePicComponent
      class="h-8 w-8 mr-4"
      size="8"
      :src="loggedIn ? loggedInProfilePic : Profile"
      alt="PP"
    />
    <a class="my-auto">{{
      isSignUpRequired ? "Log in / Sign up" : loggedIn ? "Profile" : "Login"
    }}</a>
  </button>
</template>

<script setup lang="ts">
import Profile from "@/assets/figma/Profile.png";
import { useProfilePic } from "@/def-composables/useProfilePic";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useLogin } from "@/def-composables/useLogin";
import { onMounted } from "vue";
import ProfilePicComponent from "@/components/elements/ProfilePicComponent.vue";

const { loggedInProfilePic } = useProfilePic();
const { loggedIn } = useLoggedIn();
const { tryLogin, isSignUpRequired, checkSignUpRequired } = useLogin();

onMounted(() => {
  checkSignUpRequired().then((value) => {
    if (!value) {
      tryLogin();
    }
  });
});
</script>

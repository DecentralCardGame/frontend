<template>
  <div class="bg-black flex flex-col h-[80vh] sm:h-[85vh]">
    <div class="text-center my-auto">
      <div class="-mt-40 text-white">
        <h2 class="text-5xl font-bold p-7">
          {{ isSignUpRequired ? "Sign up" : "Log in" }}
        </h2>
        <SignupComponent />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SignupComponent from "@/components/elements/Login/SignupComponent.vue";
import { useLogin } from "@/def-composables/useLogin";

const { isSignUpRequired } = useLogin();
</script>

<template>
  <router-link to="login" class="my-auto">
    <button class="text-white font-bold uppercase flex hover:underline">
      <img class="h-8 pr-4" :src="Profile" alt="CC logo" />
      <a class="my-auto">Login / Sign up</a>
    </button>
  </router-link>
</template>

<script setup lang="ts">
import Profile from "@/assets/figma/Profile.png";
</script>
